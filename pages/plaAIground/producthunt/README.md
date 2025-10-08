# 🎨 Interior Design Product Discovery Tool

> AI-powered product search for Czech interior architects - Stop wasting hours browsing e-shops!

## The Problem

Interior architects spend **30-40% of project time** manually:
- 🔍 Browsing 10-20+ e-commerce sites
- 📸 Taking screenshots and managing tabs
- 📏 Checking if products match specifications
- 🎭 Hunting for 3D models for SketchUp
- 💬 Creating presentations for clients

## Our Solution

**One tool that:**
1. 📤 Understands your moodboard and design intent (via AI)
2. 🔎 Searches across 5 Czech e-shops simultaneously
3. 💬 Refines results through conversation
4. 🎲 Flags 3D model availability instantly

## Target E-Shops (Czech Market)

| Site | Focus | Why Important |
|------|-------|---------------|
| **Siko** | Bathrooms, kitchens, tiles | Market leader in bathrooms |
| **Baumax** | Home improvement, flooring | Comprehensive catalog |
| **Hornbach** | DIY, building materials | Great for fixtures |
| **XXXLutz** | Furniture | Largest furniture retailer |
| **Sconto** | Budget furniture | Good price range |

## Quick Start

```bash
# Clone and install
npm install
npx playwright install  # Install browser dependencies

# Set up environment
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Run crawler (get products from e-shops)
npm run crawl:siko        # Test run (10 products)
npm run crawl:siko:full   # Full crawl (all products)

# Test LLM integration
npm run test:moodboard    # Test moodboard analysis

# Start backend API
npm run dev:api

# Start frontend (in another terminal)
npm run dev:frontend
```

## Project Structure

```
producthunt/
├── src/
│   ├── crawler/          # E-shop scraping scripts
│   ├── api/              # Express backend
│   ├── embeddings/       # Vector search for products
│   ├── llm/              # Claude API integration
│   └── frontend/         # React app
├── data/
│   ├── products/         # Scraped product catalog
│   └── embeddings/       # Pre-computed vectors
├── docs/                 # Documentation & research
├── tests/                # Test suites
├── CLAUDE_CONTEXT.md     # ⚠️ READ THIS if you're Claude!
└── PROJECT_PLAN.md       # Implementation roadmap
```

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **LLM:** Claude Sonnet 4.5 (moodboard analysis) + Haiku (basic tasks)
- **Vector DB:** Pinecone or local ChromaDB
- **Scraping:** Playwright + Cheerio
- **Database:** SQLite (prototype) → PostgreSQL (production)

## Cost Estimates

### Development
- Prototype: **$30-50** (includes testing & iteration)

### Production
- Per user session: **$0.10-0.15**
- For 100 users: **~$15-20/month**

## Current Status

✅ **Phase 1: Setup & Data Collection**
✅ **Phase 2: LLM Integration**

### Phase 1 Achievements
- [x] Project scaffolding
- [x] **Siko.cz Crawler** - Full implementation with pagination support
- [x] Product data extraction (specs, materials, images, technical details)
- [x] Sample product database (24+ products available)
- [x] Comprehensive product details extraction

### Phase 2 Achievements
- [x] **Moodboard Analysis System** - AI-powered design DNA extraction
- [x] **Czech Market Optimization** - Tailored for local e-shops
- [x] **Cost Optimization** - $0.01 per moodboard analysis (3x better than target)
- [x] **Conversational Refinement** - "Make it warmer", "More minimalist" feedback
- [x] **Product Enrichment** - AI-generated style tags for products

### Crawler Capabilities
- **Full pagination support** - crawls all products across multiple pages
- **Comprehensive data extraction**:
  - Product specifications (dimensions, materials, colors)
  - Technical details (installation, mounting, certifications)
  - Multiple high-resolution images (6-8 per product)
  - Czech language attribute recognition
  - Dynamic selector fallbacks for robust extraction
- **Smart rate limiting** and error handling
- **Configurable limits** - test with 10 products or crawl everything

See [PROJECT_PLAN.md](./PROJECT_PLAN.md) for detailed roadmap.

## Development Workflow

1. **Always read** `CLAUDE_CONTEXT.md` first if you're a Claude agent
2. **Check current phase** in `PROJECT_PLAN.md`
3. **Run tests** before committing: `npm test`
4. **Document changes** in relevant README files
5. **Track costs** - we're optimizing for <$0.15 per session

## Contributing

This is a prototype/learning project. Focus areas:
- ✅ Start small, validate early
- ✅ Test with real interior architects
- ✅ Keep costs low
- ✅ Stay flexible for pivots

## License

MIT - Do whatever you want with this!

## Contact

Erik Vaněk - [GitHub](https://github.com/erikvanek)

---

**📖 New to this project?** Start with reading `CLAUDE_CONTEXT.md` to understand the full context!
