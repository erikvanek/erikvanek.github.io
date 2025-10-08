# Development Checklist

Track your progress through the project phases.

## ✅ Setup (5 min)
- [ ] Cloned/navigated to project folder
- [ ] Ran `npm install`
- [ ] Created `.env` file with API key
- [ ] Read `README.md`
- [ ] Read `CLAUDE_CONTEXT.md` (if you're Claude)
- [ ] Read `NEXT_STEPS.md`

## 📊 Phase 1: Data Collection (Week 1)

### Research & Documentation
- [ ] Visited Siko.cz
- [ ] Documented HTML structure (`docs/siko-structure.md`)
- [ ] Identified product selectors
- [ ] Tested selectors in browser console

### Crawler Development
- [ ] Edited `src/crawler/siko.js`
- [ ] Extracted first 5 products successfully
- [ ] Added product detail extraction
- [ ] Implemented pagination
- [ ] Added error handling
- [ ] Crawled 50 products
- [ ] Crawled 100+ products

### Data Quality
- [ ] Validated product schema
- [ ] Checked data completeness (>90%)
- [ ] Verified image URLs work
- [ ] No duplicate products
- [ ] Created sample dataset

## 🤖 Phase 2: LLM Integration (Week 2)

### Setup
- [ ] Tested Claude API connection
- [ ] Verified cost tracking works
- [ ] Confirmed API key works

### Moodboard Analysis
- [ ] Created moodboard analysis prompt
- [ ] Tested with 5 sample images
- [ ] Achieved >80% accuracy vs manual tagging
- [ ] Optimized prompt for cost
- [ ] Documented prompt template

### Product Enrichment
- [ ] Generated embeddings for products
- [ ] Added style tags using Claude
- [ ] Validated enriched data

## 🔍 Phase 3: Product Matching (Week 2-3)

### Vector Search
- [ ] Set up vector database
- [ ] Indexed product catalog
- [ ] Tested similarity search
- [ ] Achieved <100ms search time

### Matching Algorithm
- [ ] Implemented similarity search
- [ ] Added constraint filtering
- [ ] Built re-ranking logic
- [ ] Tested with 10 queries
- [ ] Achieved >80% relevance

### Testing
- [ ] Created test dataset
- [ ] Measured precision@10
- [ ] Tuned similarity threshold
- [ ] Documented accuracy metrics

## 🔌 Phase 4: Backend API (Week 3)

### API Endpoints
- [ ] POST /api/analyze-moodboard
- [ ] POST /api/search-products
- [ ] POST /api/refine-search
- [ ] GET /api/products/:id

### Features
- [ ] Session management
- [ ] Conversation history
- [ ] Error handling
- [ ] Input validation
- [ ] CORS configuration

### Testing
- [ ] API tests written
- [ ] All endpoints working
- [ ] Error cases handled
- [ ] Performance acceptable (<2s)

## 🎨 Phase 5: Frontend MVP (Week 4)

### Setup
- [ ] React app created
- [ ] TailwindCSS configured
- [ ] API client set up

### Components
- [ ] MoodboardUploader
- [ ] ConstraintForm
- [ ] ChatInterface
- [ ] ProductGallery
- [ ] ProductCard
- [ ] FilterSidebar

### UX Polish
- [ ] Loading states
- [ ] Error messages
- [ ] Responsive design
- [ ] Smooth animations
- [ ] Accessibility basics

## 🧪 Phase 6: Testing & Launch (Week 5)

### User Testing
- [ ] Recruited 5 testers
- [ ] Prepared test scenarios
- [ ] Conducted sessions
- [ ] Gathered feedback
- [ ] Documented learnings

### Optimization
- [ ] Cost per session <$0.15
- [ ] Search relevance >85%
- [ ] Response time <2s
- [ ] Fixed critical bugs

### Documentation
- [ ] User guide written
- [ ] API docs complete
- [ ] Deployment guide ready
- [ ] Cost analysis done

### Launch
- [ ] Deployed to production
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Support channels ready

## 🚀 Post-MVP (Month 2+)

### Expansion
- [ ] Added Baumax crawler
- [ ] Added Hornbach crawler
- [ ] Added XXXLutz crawler
- [ ] Added Sconto crawler
- [ ] Expanded to 1000+ products

### Features
- [ ] 3D model search
- [ ] Project save/share
- [ ] Price tracking
- [ ] Email alerts
- [ ] Multi-language support

### Scale
- [ ] Migrated to PostgreSQL
- [ ] Implemented caching
- [ ] Added CDN
- [ ] 100+ active users

---

## 📈 Progress Tracking

**Current Phase:** Phase 1  
**Completion:** 20%  
**Next Milestone:** First 100 products crawled  
**Blockers:** None  

**Last Updated:** 2025-10-08  

---

## 🎯 Quick Wins (Do These First!)

1. [ ] Get first 5 products from Siko
2. [ ] Test Claude API with simple prompt
3. [ ] Create sample moodboard analysis
4. [ ] Document HTML selectors
5. [ ] Validate one complete product

**Total time:** ~2-3 hours  
**Impact:** Foundation for entire project!

---

## 💭 Notes & Learnings

Use this space to track insights:

```
Date: YYYY-MM-DD
Learning: 
Next time: 


Date: YYYY-MM-DD
Issue: 
Solution: 


Date: YYYY-MM-DD
Idea: 
Priority: 
```
