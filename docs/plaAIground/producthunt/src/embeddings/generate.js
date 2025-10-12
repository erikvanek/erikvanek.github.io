import { ChromaClient } from 'chromadb';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Product Embedding Generation System
 *
 * Generates embeddings for the product catalog and stores them in ChromaDB
 * for similarity-based product matching.
 */

/**
 * Initialize ChromaDB client
 */
let chroma;

async function initializeChroma() {
  try {
    // For MVP, we'll use local storage fallback primarily
    // ChromaDB setup is optional and requires external service
    chroma = new ChromaClient({
      path: process.env.CHROMA_HOST || 'http://localhost:8000'
    });

    // Test connection
    await chroma.heartbeat();
    console.log('✅ ChromaDB initialized and connected');
  } catch (error) {
    console.log('⚠️  ChromaDB not available, using local storage fallback');
    chroma = null;
  }
}

/**
 * Create text representation of product for embedding
 * @param {Object} product - Product from crawler
 * @returns {string} Text representation for embedding
 */
function createProductText(product) {
  const parts = [];

  // Product name and description
  if (product.name) parts.push(product.name);
  if (product.details?.description) parts.push(product.details.description);

  // Materials (key for design matching)
  if (product.details?.materials?.length) {
    parts.push(`Materials: ${product.details.materials.join(', ')}`);
  }

  // Specifications
  if (product.details?.specifications) {
    const specs = Object.entries(product.details.specifications)
      .filter(([key, value]) => value && value !== 'N/A')
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    if (specs) parts.push(`Specifications: ${specs}`);
  }

  // Technical details
  if (product.details?.technicalDetails) {
    const tech = Object.entries(product.details.technicalDetails)
      .filter(([key, value]) => value && value !== 'N/A')
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    if (tech) parts.push(`Technical: ${tech}`);
  }

  // AI enrichment if available
  if (product.aiEnrichment) {
    if (product.aiEnrichment.styleTags?.length) {
      parts.push(`Style: ${product.aiEnrichment.styleTags.join(', ')}`);
    }
    if (product.aiEnrichment.roomTypes?.length) {
      parts.push(`Rooms: ${product.aiEnrichment.roomTypes.join(', ')}`);
    }
    if (product.aiEnrichment.colorTags?.length) {
      parts.push(`Colors: ${product.aiEnrichment.colorTags.join(', ')}`);
    }
  }

  return parts.join('. ');
}

/**
 * Simple local embedding function using text similarity
 * This is a fallback when ChromaDB/OpenAI isn't available
 * @param {string} text - Text to embed
 * @returns {number[]} Simple embedding vector
 */
function createLocalEmbedding(text) {
  // Create a simple bag-of-words style embedding
  // This is very basic but works for MVP testing

  const keywords = [
    // Styles
    'minimalistický', 'minimalist', 'moderní', 'modern', 'skandinávský', 'scandinavian',
    'industriální', 'industrial', 'klasický', 'classic', 'rustikální', 'rustic',

    // Materials
    'dřevo', 'wood', 'kov', 'metal', 'keramika', 'ceramic', 'sklo', 'glass',
    'kámen', 'stone', 'mramor', 'marble', 'nerez', 'steel', 'mosaz', 'brass',

    // Colors
    'bílá', 'white', 'černá', 'black', 'šedá', 'grey', 'hnědá', 'brown',
    'béžová', 'beige', 'zlatá', 'gold', 'stříbrná', 'silver',

    // Rooms
    'koupelna', 'bathroom', 'kuchyně', 'kitchen', 'obývák', 'living', 'ložnice', 'bedroom',

    // Attributes
    'hladký', 'smooth', 'drsný', 'rough', 'matný', 'matte', 'lesklý', 'glossy',
    'útulný', 'cozy', 'elegantní', 'elegant', 'světlý', 'bright', 'tmavý', 'dark'
  ];

  const textLower = text.toLowerCase();
  const embedding = keywords.map(keyword => {
    // Simple TF-like scoring
    const count = (textLower.match(new RegExp(keyword, 'g')) || []).length;
    return count > 0 ? Math.log(count + 1) : 0;
  });

  // Normalize to unit vector
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return magnitude > 0 ? embedding.map(val => val / magnitude) : embedding;
}

/**
 * Generate embeddings for all products in catalog
 * @param {Object} options - Generation options
 * @returns {Promise<Object>} Generation results
 */
export async function generateEmbeddings(options = {}) {
  const { forceRegenerate = false, maxProducts = null } = options;

  console.log('🔄 Starting embedding generation...');

  // Initialize ChromaDB
  await initializeChroma();

  // Find product files
  const dataDir = './data/products';
  if (!existsSync(dataDir)) {
    throw new Error('No product data found. Run crawler first: npm run crawl:siko');
  }

  const files = readdirSync(dataDir, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && dirent.name.startsWith('siko_'))
    .map(dirent => dirent.name)
    .sort()
    .reverse(); // Latest first

  // Prefer enriched files
  const enrichedFiles = files.filter(f => f.includes('enriched'));
  const regularFiles = files.filter(f => !f.includes('enriched'));
  const sortedFiles = [...enrichedFiles, ...regularFiles];

  if (files.length === 0) {
    throw new Error('No Siko product files found. Run crawler first: npm run crawl:siko');
  }

  const latestFile = sortedFiles[0];
  const productsPath = path.join(dataDir, latestFile);

  console.log(`📁 Loading products from ${latestFile}`);
  const products = JSON.parse(readFileSync(productsPath, 'utf8'));
  const productCount = maxProducts ? Math.min(maxProducts, products.length) : products.length;

  console.log(`🔢 Processing ${productCount} products...`);

  const results = {
    totalProducts: productCount,
    embeddings: [],
    errors: [],
    usedChroma: false, // Using local embeddings for MVP
    generatedAt: new Date().toISOString()
  };

  // Process each product
  for (let i = 0; i < productCount; i++) {
    const product = products[i];

    try {
      console.log(`${i + 1}/${productCount}: ${product.name?.substring(0, 50)}...`);

      // Create text representation
      const productText = createProductText(product);

      // Generate embedding using local method
      // For MVP, we'll use the local embedding function
      // This can be upgraded to use ChromaDB or OpenAI embeddings later
      const embedding = createLocalEmbedding(productText);

      const productEmbedding = {
        id: `product_${i}`,
        productId: product.productUrl || `siko_${i}`,
        name: product.name,
        text: productText,
        embedding: embedding,
        metadata: {
          source: 'siko',
          price: product.price,
          imageUrl: product.imageUrl,
          url: product.productUrl,
          materials: product.details?.materials || [],
          specifications: product.details?.specifications || {},
          aiEnrichment: product.aiEnrichment || null,
          extractedAt: product.extractedAt
        }
      };

      results.embeddings.push(productEmbedding);

    } catch (error) {
      console.log(`   ❌ Error processing ${product.name}: ${error.message}`);
      results.errors.push({
        product: product.name,
        error: error.message
      });
    }

    // Small delay to be respectful
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Save embeddings to file
  const embeddingDir = './data/embeddings';
  if (!existsSync(embeddingDir)) {
    const { mkdirSync } = await import('fs');
    mkdirSync(embeddingDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().split('T')[0];
  const embeddingPath = path.join(embeddingDir, `siko_embeddings_${timestamp}.json`);

  writeFileSync(embeddingPath, JSON.stringify(results, null, 2));

  console.log('✅ Embedding generation complete!');
  console.log(`📊 Results:`);
  console.log(`   - Generated: ${results.embeddings.length} embeddings`);
  console.log(`   - Errors: ${results.errors.length}`);
  console.log(`   - Method: ${results.usedChroma ? 'ChromaDB' : 'Local fallback'}`);
  console.log(`   - Saved to: ${embeddingPath}`);

  return results;
}

/**
 * Load embeddings from file
 * @param {string} [filePath] - Specific embedding file, or latest if not provided
 * @returns {Object} Loaded embeddings
 */
export function loadEmbeddings(filePath = null) {
  const embeddingDir = './data/embeddings';

  if (filePath) {
    return JSON.parse(readFileSync(filePath, 'utf8'));
  }

  // Find latest embedding file
  if (!existsSync(embeddingDir)) {
    throw new Error('No embeddings found. Run: npm run generate:embeddings');
  }

  const files = readdirSync(embeddingDir, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && dirent.name.includes('embeddings'))
    .map(dirent => dirent.name)
    .sort()
    .reverse(); // Latest first

  if (files.length === 0) {
    throw new Error('No embedding files found. Run: npm run generate:embeddings');
  }

  const latestFile = files[0];
  const embeddingsPath = path.join(embeddingDir, latestFile);

  console.log(`📁 Loading embeddings from ${latestFile}`);
  return JSON.parse(readFileSync(embeddingsPath, 'utf8'));
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const maxProducts = process.env.MAX_PRODUCTS ?
    (process.env.MAX_PRODUCTS === 'null' ? null : parseInt(process.env.MAX_PRODUCTS)) :
    10; // Default to 10 for testing

  generateEmbeddings({ maxProducts })
    .then(results => {
      console.log(`\n🎉 Embedding generation completed successfully!`);
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Embedding generation failed:', error.message);
      process.exit(1);
    });
}

export { initializeChroma, createProductText, createLocalEmbedding };