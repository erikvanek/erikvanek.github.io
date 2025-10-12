# Interior Design Product Discovery API

> RESTful API for AI-powered product matching and moodboard analysis

## Overview

The Interior Design Product Discovery API provides a complete backend service for analyzing moodboards, extracting design DNA, and finding matching products from Czech e-commerce sites. Built with Express.js and integrated with advanced AI capabilities.

## Base URL

```
http://localhost:3000/api
```

## Quick Start

```bash
# Start the API server
npm run start:api

# Test all endpoints
npm run test:api

# Development with auto-reload
npm run dev:api
```

## Authentication

Currently no authentication required for MVP. All endpoints are publicly accessible.

## Sessions

The API uses session-based state management to track user interactions, design DNA, and search history. Sessions are stored in memory (use Redis for production).

## API Endpoints

### Health Check

**GET** `/health`

Check server status and service availability.

```bash
curl http://localhost:3000/api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-08T20:47:09.578Z",
  "version": "1.0.0",
  "services": {
    "llm": "operational",
    "embeddings": "operational",
    "search": "operational"
  }
}
```

---

### Create Session

**POST** `/session`

Create a new user session for state management.

```bash
curl -X POST http://localhost:3000/api/session
```

**Response:**
```json
{
  "success": true,
  "sessionId": "session_1759956429584_nfyrxmquk",
  "session": {
    "id": "session_1759956429584_nfyrxmquk",
    "createdAt": "2025-10-08T20:47:09.584Z"
  }
}
```

---

### Analyze Moodboard

**POST** `/analyze-moodboard`

Analyze an uploaded moodboard image or URL to extract design DNA.

**Content-Type:** `multipart/form-data` or `application/json`

**Parameters:**
- `sessionId` (required): Session identifier
- `moodboard` (file): Image file upload (max 10MB)
- `imageUrl` (string): Image URL (alternative to file upload)
- `projectBrief` (string): Project description and context
- `constraints` (string): JSON array of constraints

**Example with URL:**
```bash
curl -X POST http://localhost:3000/api/analyze-moodboard \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_123",
    "imageUrl": "https://example.com/moodboard.jpg",
    "projectBrief": "Modern minimalist bathroom for Prague apartment",
    "constraints": "[\"budget: 200000 CZK\", \"style: modern\"]"
  }'
```

**Example with file upload:**
```bash
curl -X POST http://localhost:3000/api/analyze-moodboard \
  -F "sessionId=session_123" \
  -F "moodboard=@/path/to/moodboard.jpg" \
  -F "projectBrief=Modern minimalist bathroom" \
  -F "constraints=[\"budget: 200000 CZK\"]"
```

**Response:**
```json
{
  "success": true,
  "sessionId": "session_123",
  "designDNA": {
    "styleAnalysis": {
      "primary": "moderní",
      "secondary": "minimalistický",
      "confidence": 0.85
    },
    "colorPalette": [
      {
        "name": "bílá",
        "hex": "#FFFFFF",
        "prominence": 0.5
      },
      {
        "name": "světle šedá",
        "hex": "#E8E8E8",
        "prominence": 0.3
      }
    ],
    "materials": ["keramika", "kov", "dřevo"],
    "roomContext": {
      "type": "koupelna",
      "size": "střední"
    },
    "mood": {
      "temperature": "neutrální",
      "atmosphere": ["elegantní", "čistý"],
      "brightness": "světlý"
    },
    "searchKeywords": {
      "czech": ["moderní", "bílý", "keramika"],
      "english": ["modern", "white", "ceramic"]
    },
    "meta": {
      "extractedAt": "2025-10-08T20:47:01.495Z",
      "cost": 0.0107,
      "model": "claude-sonnet-4-20250514"
    }
  },
  "cost": 0.0107,
  "sessionTotalCost": 0.0107
}
```

---

### Search Products

**POST** `/search-products`

Find products matching the design DNA with optional constraints.

**Parameters:**
- `sessionId` (required): Session identifier
- `designDNA` (object): Design DNA to search with (uses session DNA if not provided)
- `constraints` (object): Search constraints
- `topK` (number): Maximum results to return (default: 20)
- `includeReranking` (boolean): Enable intelligent re-ranking (default: true)

**Constraint Options:**
```json
{
  "roomType": "koupelna",
  "styles": ["minimalistický", "moderní"],
  "materials": ["keramika", "kov"],
  "minPrice": 3000,
  "maxPrice": 10000
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/search-products \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_123",
    "constraints": {
      "roomType": "koupelna",
      "materials": ["keramika"],
      "styles": ["moderní"]
    },
    "topK": 10,
    "includeReranking": true
  }'
```

**Response:**
```json
{
  "success": true,
  "sessionId": "session_123",
  "searchResults": {
    "query": {
      "designDNA": "...",
      "constraints": {...},
      "searchQuery": "Style: moderní..."
    },
    "results": [
      {
        "id": "product_1",
        "name": "WC závěsné SAT Brevis včetně prkénka softclose",
        "similarity": 0.759,
        "finalScore": 1.159,
        "bonusScore": 0.4,
        "reasons": {
          "styleMatch": true,
          "roomMatch": true,
          "colorMatches": 2
        },
        "metadata": {
          "source": "siko",
          "price": "5 290 Kč",
          "url": "https://www.siko.cz/...",
          "materials": ["keramika", "sanitární", "bílá"],
          "aiEnrichment": {
            "styleTags": ["minimalistický", "moderní"],
            "roomTypes": ["koupelna", "toaleta"],
            "colorTags": ["bílá", "neutrální"]
          }
        },
        "explanation": {
          "product": {
            "name": "WC závěsné SAT Brevis...",
            "price": "5 290 Kč",
            "url": "https://www.siko.cz/..."
          },
          "overallScore": 115.9,
          "confidence": "high",
          "reasons": [
            {
              "type": "similarity",
              "description": "75.9% vector similarity to your design vision"
            },
            {
              "type": "style",
              "description": "Style matches: moderní"
            },
            {
              "type": "room",
              "description": "Perfect for: koupelna"
            }
          ]
        }
      }
    ],
    "metadata": {
      "totalEmbeddings": 5,
      "beforeConstraints": 5,
      "afterConstraints": 5,
      "topK": 10,
      "avgSimilarity": 0.76,
      "avgFinalScore": 1.13,
      "searchedAt": "2025-10-08T20:47:09.607Z"
    },
    "totalResults": 5
  },
  "sessionSearchCount": 1
}
```

---

### Refine Search

**POST** `/refine-search`

Refine the search results based on conversational feedback.

**Parameters:**
- `sessionId` (required): Session identifier
- `feedback` (required): User feedback text
- `previousResults` (optional): Previous search results for context

**Example:**
```bash
curl -X POST http://localhost:3000/api/refine-search \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "session_123",
    "feedback": "Make it warmer and more cozy"
  }'
```

**Response:**
```json
{
  "success": true,
  "sessionId": "session_123",
  "refinedDNA": {
    "styleAnalysis": {
      "primary": "útulný minimalistický",
      "secondary": "skandinávský",
      "confidence": 0.8
    },
    "colorPalette": [
      {
        "name": "teplá bílá",
        "hex": "#FFF8E7",
        "prominence": 0.4
      },
      {
        "name": "dřevo",
        "hex": "#D2B48C",
        "prominence": 0.3
      }
    ],
    "mood": {
      "temperature": "teplý",
      "atmosphere": ["útulný", "měkký"],
      "brightness": "světlý"
    },
    "meta": {
      "refinedAt": "2025-10-08T20:47:18.870Z",
      "refinementCost": 0.0044,
      "userFeedback": "Make it warmer and more cozy"
    }
  },
  "searchResults": {
    "results": [...],
    "metadata": {...}
  },
  "cost": 0.0044,
  "sessionTotalCost": 0.0151
}
```

---

### Get Product Details

**GET** `/products/:productId`

Get detailed information about a specific product.

**Parameters:**
- `productId` (required): Product identifier
- `sessionId` (query): Session ID for personalized explanations

**Example:**
```bash
curl "http://localhost:3000/api/products/product_1?sessionId=session_123"
```

**Response:**
```json
{
  "success": true,
  "product": {
    "id": "product_1",
    "name": "WC závěsné SAT Brevis včetně prkénka softclose",
    "text": "Product description with specifications...",
    "metadata": {
      "source": "siko",
      "price": "5 290 Kč",
      "imageUrl": "https://api.siko.cz/medias/...",
      "url": "https://www.siko.cz/...",
      "materials": ["keramika", "sanitární", "bílá", "matná"],
      "specifications": {
        "Výška": "...",
        "Barva": "popisná",
        "Značka": "SATKategorie:Závěsné WC mísy"
      },
      "aiEnrichment": {
        "styleTags": ["minimalistický", "moderní"],
        "roomTypes": ["koupelna", "moderní koupelna"],
        "colorTags": ["bílá", "neutrální"],
        "enrichedAt": "2025-10-08T20:39:34.587Z"
      }
    },
    "explanation": {
      "overallScore": 115.9,
      "confidence": "high",
      "reasons": [...]
    }
  }
}
```

---

### Get Session Information

**GET** `/session/:sessionId`

Retrieve session information and summary.

**Example:**
```bash
curl http://localhost:3000/api/session/session_123
```

**Response:**
```json
{
  "success": true,
  "session": {
    "id": "session_123",
    "createdAt": "2025-10-08T20:47:09.584Z",
    "updatedAt": "2025-10-08T20:47:36.256Z",
    "hasDesignDNA": true,
    "searchCount": 4,
    "conversationCount": 4,
    "totalCost": 0.0246,
    "designDNA": {
      "style": "útulný minimalistický",
      "colors": ["teplá bílá", "dřevo", "světle šedá"],
      "materials": ["keramika", "kov", "dřevo"],
      "roomType": "koupelna"
    }
  }
}
```

---

### System Statistics

**GET** `/stats`

Get system-wide statistics and performance metrics.

**Example:**
```bash
curl http://localhost:3000/api/stats
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "sessions": {
      "total": 1,
      "active": 1
    },
    "costs": {
      "total": 0.0246,
      "average": 0.0246
    },
    "searches": {
      "total": 1,
      "average": 1.0
    },
    "products": {
      "totalProducts": 5,
      "error": null
    },
    "llmStats": {
      "total": 0.0246,
      "tokens": {
        "input": 3542,
        "output": 1847,
        "cached": 0
      },
      "calls": 4
    }
  }
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error description"
}
```

**HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (missing parameters, invalid data)
- `404` - Not Found (invalid endpoints, missing resources)
- `500` - Internal Server Error

**Common Errors:**

1. **Missing Session ID**
```json
{
  "success": false,
  "error": "Session ID is required"
}
```

2. **No Design DNA**
```json
{
  "success": false,
  "error": "Design DNA not found. Please analyze a moodboard first."
}
```

3. **File Upload Error**
```json
{
  "success": false,
  "error": "File upload error: Only image files are allowed"
}
```

4. **Product Not Found**
```json
{
  "success": false,
  "error": "Product not found"
}
```

## Rate Limiting

Currently no rate limiting implemented (suitable for MVP). Consider implementing rate limiting for production:

- 100 requests per minute per IP
- 1000 requests per hour per session
- File uploads limited to 10MB

## File Upload Specifications

**Moodboard Image Requirements:**
- **Max file size:** 10MB
- **Supported formats:** JPG, JPEG, PNG, GIF, WebP
- **Recommended size:** 1000x1000px minimum
- **Quality:** High resolution for better analysis

**Upload Methods:**
1. **Multipart form upload** - for direct file upload
2. **URL reference** - for images hosted elsewhere

## Performance Metrics

Based on test results with 5 products:

**Response Times:**
- Moodboard analysis: ~8-10 seconds
- Product search: <25ms
- Conversational refinement: ~9-10 seconds
- Product details: <5ms
- Session operations: <5ms

**Throughput:**
- Product searches: 357 requests/second
- File uploads: Limited by analysis time (~6 per minute)

**Costs:**
- Moodboard analysis: $0.01 per image
- Conversational refinement: $0.004 per refinement
- Product search: Free (local processing)

## Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev:api

# Run comprehensive tests
npm run test:api

# Generate fresh embeddings if needed
npm run generate:embeddings
```

### Environment Variables

```bash
# Required
ANTHROPIC_API_KEY=your_claude_api_key

# Optional
PORT=3000
NODE_ENV=development
MAX_PRODUCTS=null
```

### Testing

The API includes a comprehensive test suite covering:

- Health checks and connectivity
- Session management
- Moodboard analysis (with real images)
- Product search with constraints
- Conversational refinement
- Product details retrieval
- Error handling
- Performance benchmarks

Run tests:
```bash
npm run test:api
```

### Production Considerations

For production deployment:

1. **Database:** Replace in-memory sessions with Redis/PostgreSQL
2. **File Storage:** Use cloud storage (AWS S3, Google Cloud Storage)
3. **Rate Limiting:** Implement API rate limiting
4. **Authentication:** Add user authentication and authorization
5. **HTTPS:** Enable SSL/TLS encryption
6. **Monitoring:** Add logging, metrics, and health monitoring
7. **Caching:** Cache search results and embeddings
8. **Load Balancing:** Scale horizontally with multiple instances

## Integration Examples

### Frontend Integration

```javascript
// Create session
const sessionResponse = await fetch('/api/session', {
  method: 'POST'
});
const { sessionId } = await sessionResponse.json();

// Upload and analyze moodboard
const formData = new FormData();
formData.append('sessionId', sessionId);
formData.append('moodboard', fileInput.files[0]);
formData.append('projectBrief', 'Modern bathroom renovation');

const analysisResponse = await fetch('/api/analyze-moodboard', {
  method: 'POST',
  body: formData
});
const { designDNA } = await analysisResponse.json();

// Search for products
const searchResponse = await fetch('/api/search-products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sessionId,
    constraints: { roomType: 'koupelna' },
    topK: 20
  })
});
const { searchResults } = await searchResponse.json();
```

### Webhook Integration

```javascript
// Process results with webhook
app.post('/webhook/search-complete', (req, res) => {
  const { sessionId, searchResults } = req.body;

  // Process search results
  const topProducts = searchResults.results.slice(0, 5);

  // Send notification, update UI, etc.
  console.log(`Found ${topProducts.length} products for session ${sessionId}`);

  res.json({ success: true });
});
```

## Changelog

### v1.0.0 (2025-10-08)
- Initial API release
- Complete moodboard analysis pipeline
- Product search with AI-enhanced matching
- Conversational refinement system
- Session management
- Comprehensive error handling
- File upload support
- System statistics endpoint

---

## Support

For API support and questions:
- Check the test suite for usage examples
- Review error messages for troubleshooting
- Ensure all dependencies are installed
- Verify embeddings are generated: `npm run generate:embeddings`

**Quick troubleshooting:**
```bash
# Check server health
curl http://localhost:3000/api/health

# Verify embeddings
ls data/embeddings/

# Test with sample session
npm run test:api
```

Last updated: 2025-10-08