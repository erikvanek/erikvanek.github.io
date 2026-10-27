import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';

// Import our core functionality
import { analyzeMoodboard, refineMoodboard, enrichProduct } from '../llm/analyzeMoodboard.js';
import { searchProducts, explainMatch } from '../embeddings/search.js';
import { loadEmbeddings } from '../embeddings/generate.js';
import client from '../llm/client.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = join(__dirname, '../../uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'moodboard-' + uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept image files only
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// In-memory session storage (for MVP - use Redis in production)
const sessions = new Map();

// Utility functions
function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function getSession(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      id: sessionId,
      createdAt: new Date().toISOString(),
      designDNA: null,
      searchHistory: [],
      conversationHistory: [],
      totalCost: 0
    });
  }
  return sessions.get(sessionId);
}

function saveSession(session) {
  sessions.set(session.id, {
    ...session,
    updatedAt: new Date().toISOString()
  });
}

// API Routes

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      llm: 'operational',
      embeddings: 'operational',
      search: 'operational'
    }
  });
});

/**
 * Create a new session
 */
app.post('/api/session', (req, res) => {
  const sessionId = generateSessionId();
  const session = getSession(sessionId);

  res.json({
    success: true,
    sessionId: sessionId,
    session: {
      id: session.id,
      createdAt: session.createdAt
    }
  });
});

/**
 * Analyze moodboard from uploaded file or URL
 */
app.post('/api/analyze-moodboard', upload.single('moodboard'), async (req, res) => {
  try {
    const { sessionId, projectBrief, constraints, imageUrl } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Session ID is required'
      });
    }

    let imageData;

    if (req.file) {
      // File upload
      const imagePath = req.file.path;
      imageData = `data:${req.file.mimetype};base64,${readFileSync(imagePath, 'base64')}`;
    } else if (imageUrl) {
      // URL provided
      imageData = imageUrl;
    } else {
      return res.status(400).json({
        success: false,
        error: 'Either upload a file or provide an image URL'
      });
    }

    const session = getSession(sessionId);

    console.log(`📸 Analyzing moodboard for session ${sessionId}`);

    const designDNA = await analyzeMoodboard(imageData, {
      projectBrief: projectBrief || '',
      constraints: constraints ? JSON.parse(constraints) : []
    });

    // Update session
    session.designDNA = designDNA;
    session.totalCost += designDNA.meta?.cost || 0;
    session.conversationHistory.push({
      type: 'moodboard_analysis',
      timestamp: new Date().toISOString(),
      input: { projectBrief, constraints },
      output: designDNA,
      cost: designDNA.meta?.cost || 0
    });

    saveSession(session);

    res.json({
      success: true,
      sessionId: sessionId,
      designDNA: designDNA,
      cost: designDNA.meta?.cost || 0,
      sessionTotalCost: session.totalCost
    });

  } catch (error) {
    console.error('Moodboard analysis error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      fallback: error.fallback || null
    });
  }
});

/**
 * Search for products based on design DNA
 */
app.post('/api/search-products', async (req, res) => {
  try {
    const {
      sessionId,
      designDNA,
      constraints = {},
      topK = 20,
      includeReranking = true
    } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Session ID is required'
      });
    }

    const session = getSession(sessionId);

    // Use session's design DNA if not provided
    const searchDNA = designDNA || session.designDNA;

    if (!searchDNA) {
      return res.status(400).json({
        success: false,
        error: 'Design DNA not found. Please analyze a moodboard first.'
      });
    }

    console.log(`🔍 Searching products for session ${sessionId}`);

    const results = await searchProducts(searchDNA, {
      topK,
      constraints,
      includeReranking
    });

    // Add match explanations for top results
    const enrichedResults = results.results.slice(0, 5).map(product => ({
      ...product,
      explanation: explainMatch(product, searchDNA)
    }));

    const searchResult = {
      ...results,
      results: enrichedResults,
      totalResults: results.results.length
    };

    // Update session
    session.searchHistory.push({
      timestamp: new Date().toISOString(),
      query: { designDNA: searchDNA, constraints, topK },
      results: searchResult.metadata,
      resultCount: searchResult.totalResults
    });

    saveSession(session);

    res.json({
      success: true,
      sessionId: sessionId,
      searchResults: searchResult,
      sessionSearchCount: session.searchHistory.length
    });

  } catch (error) {
    console.error('Product search error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Refine search based on conversational feedback
 */
app.post('/api/refine-search', async (req, res) => {
  try {
    const {
      sessionId,
      feedback,
      previousResults
    } = req.body;

    if (!sessionId || !feedback) {
      return res.status(400).json({
        success: false,
        error: 'Session ID and feedback are required'
      });
    }

    const session = getSession(sessionId);

    if (!session.designDNA) {
      return res.status(400).json({
        success: false,
        error: 'No design DNA found. Please analyze a moodboard first.'
      });
    }

    console.log(`💬 Refining search for session ${sessionId}: "${feedback}"`);

    // Refine the design DNA based on feedback
    const refinedDNA = await refineMoodboard(session.designDNA, feedback);

    // Search with refined DNA
    const results = await searchProducts(refinedDNA, {
      topK: 20,
      includeReranking: true
    });

    // Add explanations
    const enrichedResults = results.results.slice(0, 5).map(product => ({
      ...product,
      explanation: explainMatch(product, refinedDNA)
    }));

    const searchResult = {
      ...results,
      results: enrichedResults,
      totalResults: results.results.length,
      refinedDNA
    };

    // Update session
    session.designDNA = refinedDNA; // Use refined DNA going forward
    session.totalCost += refinedDNA.meta?.refinementCost || 0;
    session.conversationHistory.push({
      type: 'refinement',
      timestamp: new Date().toISOString(),
      feedback,
      refinedDNA,
      cost: refinedDNA.meta?.refinementCost || 0
    });

    saveSession(session);

    res.json({
      success: true,
      sessionId: sessionId,
      refinedDNA,
      searchResults: searchResult,
      cost: refinedDNA.meta?.refinementCost || 0,
      sessionTotalCost: session.totalCost
    });

  } catch (error) {
    console.error('Search refinement error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get detailed product information
 */
app.get('/api/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { sessionId } = req.query;

    // Load embeddings to find product
    const embeddingData = loadEmbeddings();
    const product = embeddingData.embeddings.find(p =>
      p.id === productId || p.productId === productId
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // If session provided, add explanation based on current design DNA
    let explanation = null;
    if (sessionId) {
      const session = getSession(sessionId);
      if (session.designDNA) {
        explanation = explainMatch(product, session.designDNA);
      }
    }

    res.json({
      success: true,
      product: {
        ...product,
        explanation
      }
    });

  } catch (error) {
    console.error('Product details error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get session information and history
 */
app.get('/api/session/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = getSession(sessionId);

    res.json({
      success: true,
      session: {
        id: session.id,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        hasDesignDNA: !!session.designDNA,
        searchCount: session.searchHistory.length,
        conversationCount: session.conversationHistory.length,
        totalCost: session.totalCost,
        designDNA: session.designDNA ? {
          style: session.designDNA.styleAnalysis?.primary,
          colors: session.designDNA.colorPalette?.map(c => c.name).slice(0, 3),
          materials: session.designDNA.materials,
          roomType: session.designDNA.roomContext?.type
        } : null
      }
    });

  } catch (error) {
    console.error('Session retrieval error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get system statistics
 */
app.get('/api/stats', (req, res) => {
  try {
    const totalSessions = sessions.size;
    const activeSessions = Array.from(sessions.values()).filter(s =>
      Date.now() - new Date(s.createdAt).getTime() < 24 * 60 * 60 * 1000 // 24 hours
    ).length;

    const totalCosts = Array.from(sessions.values()).reduce((sum, s) => sum + s.totalCost, 0);
    const totalSearches = Array.from(sessions.values()).reduce((sum, s) => sum + s.searchHistory.length, 0);

    // Load embeddings info
    let embeddingStats = { totalProducts: 0, error: null };
    try {
      const embeddingData = loadEmbeddings();
      embeddingStats.totalProducts = embeddingData.embeddings.length;
    } catch (error) {
      embeddingStats.error = error.message;
    }

    res.json({
      success: true,
      stats: {
        sessions: {
          total: totalSessions,
          active: activeSessions
        },
        costs: {
          total: totalCosts,
          average: totalSessions > 0 ? totalCosts / totalSessions : 0
        },
        searches: {
          total: totalSearches,
          average: totalSessions > 0 ? totalSearches / totalSessions : 0
        },
        products: embeddingStats,
        llmStats: client.getTotalCosts()
      }
    });

  } catch (error) {
    console.error('Stats retrieval error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Error handling middleware
 */
app.use((error, req, res, next) => {
  console.error('API Error:', error);

  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      error: `File upload error: ${error.message}`
    });
  }

  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /api/health',
      'POST /api/session',
      'POST /api/analyze-moodboard',
      'POST /api/search-products',
      'POST /api/refine-search',
      'GET /api/products/:productId',
      'GET /api/session/:sessionId',
      'GET /api/stats'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Interior Design API Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`);
  console.log(`🎨 Ready to process moodboards and find products!`);

  // Load embeddings on startup to validate system
  try {
    const embeddingData = loadEmbeddings();
    console.log(`📊 Loaded ${embeddingData.embeddings.length} product embeddings`);
  } catch (error) {
    console.warn(`⚠️  Warning: Could not load embeddings - ${error.message}`);
    console.log(`💡 Run: npm run generate:embeddings`);
  }
});

export default app;