# Project Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     USER (Interior Architect)                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                         │
│  • Image uploader                                             │
│  • Constraint form (budget, dimensions)                       │
│  • Chat interface                                             │
│  • Product gallery                                            │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    BACKEND API (Express)                      │
│  Routes:                                                      │
│  • POST /api/analyze-moodboard                                │
│  • POST /api/search-products                                  │
│  • POST /api/refine-search                                    │
│  • GET  /api/products/:id                                     │
└────────────┬─────────────────────────┬──────────────────────┘
             │                         │
             ▼                         ▼
┌────────────────────────┐  ┌──────────────────────────────┐
│    LLM Module          │  │   Product Database           │
│                        │  │                              │
│  • Moodboard analysis  │  │  • Scraped products (JSON)   │
│  • Design DNA extract  │  │  • Product embeddings        │
│  • Conv. refinement    │  │  • Metadata & images         │
│                        │  │                              │
│  Claude Sonnet 4.5 ◄───┼──┤  Vector Search:              │
│  Claude Haiku      ◄───┼──┤  • Similarity matching       │
│                        │  │  • Constraint filtering      │
└────────────────────────┘  └──────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────┐
│                    Anthropic API                              │
│  • Claude Sonnet 4.5 ($3/$15 per M tokens)                   │
│  • Claude Haiku ($0.25/$1.25 per M tokens)                   │
└──────────────────────────────────────────────────────────────┘

              ┌─────────────────────────┐
              │   Crawler Service       │
              │                         │
              │  Scrapes:               │
              │  • Siko.cz              │
              │  • Baumax.cz            │
              │  • Hornbach.cz          │
              │  • XXXLutz.cz           │
              │  • Sconto.cz            │
              └─────────┬───────────────┘
                        │
                        ▼
              ┌─────────────────────────┐
              │  Czech E-Commerce Sites │
              └─────────────────────────┘
```

## Data Flow

### 1. Product Discovery Flow
```
User uploads moodboard
       ↓
LLM analyzes images → Extract design DNA
       ↓
Convert to embeddings
       ↓
Search product database → Similarity match
       ↓
Apply constraints (price, dimensions)
       ↓
Return ranked results
```

### 2. Refinement Flow
```
User: "warmer tones"
       ↓
LLM interprets feedback
       ↓
Adjust search parameters
       ↓
Re-rank results
       ↓
Show updated products
```

### 3. Crawling Flow
```
Crawler runs (scheduled/manual)
       ↓
Visit e-shop pages
       ↓
Extract product data
       ↓
Validate & clean data
       ↓
Save to database
       ↓
Generate embeddings
```

## Key Design Decisions

### Why Embeddings?
- **Fast:** Search millions of products in milliseconds
- **Cheap:** No LLM call needed for initial filtering
- **Semantic:** Understands "minimalist" = "simple" = "clean"

### Why Two Claude Models?
- **Haiku:** Cheap ($0.001/request) for simple tasks
- **Sonnet:** Smart for complex moodboard analysis

### Why Crawling vs API?
- Czech e-shops rarely have public APIs
- Crawling gives us full control
- Can enrich data with our own tags

## Scaling Strategy

### Phase 1 (MVP): 100 products
- Single e-shop (Siko)
- Manual hosting
- SQLite database

### Phase 2 (Beta): 1000 products
- 5 e-shops
- Auto-refresh weekly
- Vector DB (Pinecone)

### Phase 3 (Production): 10,000+ products
- All major Czech e-shops
- Daily updates
- PostgreSQL + Redis
- CDN for images

## Cost Breakdown (Per 100 Users)

```
LLM API costs:
  • Moodboard analysis: $0.05 × 200 sessions = $10
  • Conversational refinement: $0.10 × 200 = $20
  • Product enrichment: Batch process, ~$5
  
Infrastructure:
  • Hosting: ~$20/month
  • Vector DB: ~$10/month
  • Storage: ~$5/month
  
Total: ~$70/month for 100 active users
Per user: ~$0.70/month
```

## Technology Choices

| Component | Technology | Why |
|-----------|-----------|-----|
| Backend | Node.js + Express | Fast prototyping, easy async |
| Frontend | React + Vite | Modern, fast, component-based |
| LLM | Claude (Anthropic) | Best for image analysis |
| Crawler | Playwright | Handles JavaScript-heavy sites |
| Database | SQLite → PostgreSQL | Start simple, scale later |
| Vector DB | Pinecone / ChromaDB | Mature, good docs |
| Hosting | TBD | Vercel/Railway for MVP |

## Security Considerations

- API keys in environment variables (never commit)
- Rate limiting on API endpoints
- Input validation on all user data
- CORS restrictions on frontend
- Sanitize scraped HTML content

## Future Enhancements

- Real-time price tracking
- 3D model auto-download
- Room planning AI
- Style trend analysis
- Multi-language support
- Mobile app
