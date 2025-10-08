# Claude Agent Context - Interior Design Product Discovery Tool

## 🎯 PROJECT MISSION
Build an AI-powered web tool that helps Czech interior architects find products (furniture, fixtures, lighting) that match their design vision by:
1. Understanding moodboards and project briefs using LLM
2. Searching across multiple Czech e-commerce sites
3. Providing conversational refinement of results
4. Flagging 3D model availability for SketchUp

## 🎨 THE PROBLEM WE'RE SOLVING
Interior architects waste 30-40% of project time manually browsing 10-20+ e-shops, taking screenshots, checking if products match specs (dimensions, budget, style), then hunting for 3D models separately. This tool eliminates that friction.

## 🏪 TARGET E-COMMERCE SITES (Czech Market)
1. **Siko** (siko.cz) - Bathrooms, kitchens, tiles, flooring
2. **Baumax** (baumax.cz) - Home improvement, flooring, tiles
3. **Hornbach** (hornbach.cz) - DIY, building materials, sanitary
4. **XXXLutz** (xxxlutz.cz) - Furniture (sofas, beds, tables)
5. **Sconto** (sconto-nabytek.cz) - Furniture warehouse

## 🔄 USER WORKFLOW
```
1. User uploads moodboard images + project brief
2. LLM extracts "design DNA" (style, colors, materials, mood)
3. User enters constraints (budget, dimensions, category)
4. System matches products from database
5. User refines via chat: "warmer tones", "more minimalist", etc.
6. System shows refined results with 3D model availability
```

## 💰 COST OPTIMIZATION STRATEGY
- **Use embeddings** for cheap product matching (pennies)
- **Claude Haiku** for basic tasks ($0.25/M tokens)
- **Claude Sonnet 4.5** only for moodboard analysis and conversational refinement
- **Prompt caching** for repeated system prompts
- Target: $0.10-0.15 per user session

## 🏗️ TECHNICAL ARCHITECTURE (MVP)
```
┌─────────────────┐
│   Frontend      │ React + Image upload + Chat interface
└────────┬────────┘
         │
┌────────▼────────┐
│   Backend API   │ Node.js/Express
└────────┬────────┘
         │
    ┌────┴─────┬──────────┬─────────────┐
    │          │          │             │
┌───▼───┐  ┌──▼──┐   ┌───▼────┐   ┌────▼─────┐
│ Claude│  │ Vec │   │Product │   │ Crawler  │
│  API  │  │ DB  │   │   DB   │   │ Service  │
└───────┘  └─────┘   └────────┘   └──────────┘
```

## 📁 PROJECT STRUCTURE
```
/src
  /crawler       # E-shop scraping scripts
  /api          # Express backend
  /embeddings   # Vector DB for product matching
  /llm          # Claude API integration
  /frontend     # React app
/data
  /products     # Scraped product catalog
  /embeddings   # Pre-computed vectors
/docs
  /research     # Market research, workflow analysis
/tests
```

## 🚀 IMPLEMENTATION PHASES

### Phase 1: Data Collection (Week 1) ✅ **COMPLETED**
- [x] Build crawler for 1 e-shop (start with Siko) ✅ **Full Siko.cz implementation**
- [x] Extract: name, price, dimensions, images, URL ✅ **Plus specifications, materials, technical details**
- [x] Store in JSON/SQLite ✅ **Timestamped JSON files**
- [x] Validate data quality ✅ **24+ products with comprehensive details**

**🎉 Major achievements:**
- **Pagination support** - crawls all products across multiple pages
- **Comprehensive extraction** - specifications, materials, technical details, 6-8 images per product
- **Czech language support** - recognizes Czech attributes (Rozměry, Materiál, etc.)
- **Dynamic selectors** - robust fallbacks for changing page structure
- **Rate limiting** - respectful crawling with proper delays
- **Configuration options** - test runs vs. full section crawls

### Phase 2: LLM Integration (Week 2) ✅ **COMPLETED**
- [x] Moodboard analysis prompt ✅ **Complete Czech market system**
- [x] Extract style keywords, colors, mood ✅ **Advanced design DNA extraction**
- [x] Test with real moodboards ✅ **3 room types validated**
- [x] Refine prompts ✅ **Cost optimized to $0.01/analysis**

### Phase 3: Product Matching (Week 2-3)
- [ ] Generate embeddings for products
- [ ] Implement similarity search
- [ ] Test matching accuracy
- [ ] Add constraint filtering

### Phase 4: Frontend MVP (Week 3-4)
- [ ] Image upload component
- [ ] Chat interface
- [ ] Product gallery with filters
- [ ] Basic styling

### Phase 5: Refinement & Testing (Week 4-5)
- [ ] Test with real interior architects
- [ ] Gather feedback
- [ ] Optimize costs
- [ ] Polish UX

## 🎯 SUCCESS METRICS
- Product search time: < 5 minutes (vs 30-60 minutes manual)
- Match relevance: > 80% user satisfaction
- Cost per session: < $0.15
- 3D model availability: > 40% of products flagged

## 🔀 PIVOT POINTS
If something doesn't work, here are easy pivots:
1. **LLM too expensive?** → Use only embeddings + keyword matching
2. **Crawling too hard?** → Start with manual product entry for 1 category
3. **Users don't like chat?** → Switch to filter-based UI
4. **Czech market too small?** → Expand to EU/English sites
5. **3D models unavailable?** → Partner with 3D modeling services

## 💡 WHEN WORKING ON THIS PROJECT
- **Always check** the current phase in PROJECT_PLAN.md
- **Read** implementation notes in relevant /src folders
- **Test locally** before committing
- **Document** any API changes or new prompts
- **Keep costs low** - use Haiku for dev, Sonnet for production

## 🔧 DEVELOPMENT COMMANDS
```bash
# Install dependencies
npm install

# Run crawler
npm run crawl:siko

# Start backend
npm run dev:api

# Start frontend
npm run dev:frontend

# Run tests
npm test
```

## 📝 IMPORTANT NOTES
- This is a **prototype** - prioritize learning over perfection
- **Start small** - 1 e-shop, 1 category, basic matching
- **Validate assumptions** - test with real users early
- **Measure everything** - track costs, accuracy, user satisfaction
- **Stay flexible** - be ready to pivot based on feedback

---
Last updated: 2025-10-08
Project owner: Erik Vaněk
