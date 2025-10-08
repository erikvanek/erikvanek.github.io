# 🎯 NEXT STEPS - Start Here!

**Current Status:** Phase 1 - Foundation (20% complete)  
**Updated:** 2025-10-08  
**Next Milestone:** Working Siko crawler with 100 products

---

## ⚡ Do These 3 Things First

### 1. Install & Verify Setup (5 min)
```bash
cd /Users/erik/dev/erikvanek.github.io/pages/plaAIground/producthunt
npm install
cp .env.example .env
# Edit .env - add your ANTHROPIC_API_KEY
```

### 2. Research Siko.cz Structure (15 min)
Visit: https://www.siko.cz/koupelny/sanitarni-keramika

**Document in a new file: `docs/siko-structure.md`**
```markdown
# Siko.cz HTML Structure

## Product Listing Page
- URL pattern: ...
- Products per page: ...
- Product card selector: ...
- Pagination selector: ...

## Product Detail Page
- Title selector: ...
- Price selector: ...
- Image selector: ...
- Dimensions location: ...
- Description selector: ...
```

### 3. Implement Basic Crawler (30-60 min)
Edit: `src/crawler/siko.js`

**Minimum viable extraction:**
- ✅ Product name
- ✅ Price (in CZK)
- ✅ Main image URL
- ✅ Product page URL

**Save 10-20 products to test** before crawling more!

---

## 🔄 Development Loop

### Iteration 1: Extract 5 Products
```bash
# Edit siko.js - extract from first page only
# Run crawler
npm run crawl:siko

# Check output
cat data/products/siko_*.json

# Verify:
# - All required fields present?
# - Data looks correct?
# - Images load?
```

### Iteration 2: Add Product Details
```bash
# Visit product pages
# Extract detailed info:
# - Dimensions
# - Materials  
# - Full description

# Test with 5 products again
npm run crawl:siko
```

### Iteration 3: Scale Up
```bash
# Add pagination
# Crawl 50-100 products
# Monitor for issues:
# - Rate limiting?
# - Missing data?
# - Errors?
```

---

## 📋 Phase 1 Checklist

### Week 1: Data Collection
- [ ] Siko.cz HTML structure documented
- [ ] Basic crawler extracts 10 products
- [ ] Full crawler extracts 100+ products
- [ ] Product schema validated
- [ ] Sample dataset created

### Data Quality Checks
- [ ] All products have names
- [ ] Prices are numeric (not strings)
- [ ] At least 1 image per product
- [ ] Product URLs work
- [ ] No duplicate products

### Documentation
- [ ] `docs/siko-structure.md` created
- [ ] Extraction logic documented
- [ ] Known issues listed
- [ ] Sample products saved

---

## 🚦 Decision Points

### After 50 Products Crawled
**Ask yourself:**
- Is the data quality good? (>90% complete records)
- Are extraction selectors reliable?
- Do I need more fields? (3D models, ratings?)

**Decision:**
- ✅ Good quality → Continue to 100+ products
- ❌ Poor quality → Fix selectors, re-crawl

### After 100 Products Crawled
**Ask yourself:**
- Do I have enough variety? (different price ranges, styles)
- Should I add more categories? (tiles, lighting)
- Ready to test LLM integration?

**Decision:**
- ✅ Ready → Move to Phase 2 (LLM Integration)
- ❌ Not ready → Expand categories or fix data

---

## 🎨 Phase 2 Preview (Don't Start Yet!)

**Once you have 100+ products:**

### Test LLM Analysis
```javascript
// Create: tests/test-moodboard.js
import client from '../src/llm/client.js';

const result = await client.sendMessage({
  prompt: `Analyze this design style: 
    - White ceramic
    - Chrome fixtures  
    - Minimalist
    
    Extract: style tags, colors, materials`,
  model: 'haiku'
});

console.log(result.text);
```

### Generate Product Embeddings
```bash
# Will implement in Phase 2:
npm run generate:embeddings
```

---

## 💡 Tips for Success

### When Writing Code
1. **Start simple** - Get 5 products working before scaling
2. **Test frequently** - Run after every change
3. **Log everything** - Use console.log liberally
4. **Handle errors** - Wrap in try/catch

### When Crawling
1. **Be respectful** - Add delays (1000ms minimum)
2. **Save progress** - Write to file incrementally
3. **Handle failures** - Some products will fail, that's ok
4. **Validate data** - Check output makes sense

### When Stuck
1. **Read the docs** - Check QUICKSTART.md
2. **Check examples** - Look at other crawlers
3. **Test smaller** - Reduce scope, find the issue
4. **Ask for help** - Document what you tried

---

## 🔀 Pivot Options

### If Crawling is Too Hard
**Option A:** Start with manual entry
- Create 20 products by hand
- Test LLM matching logic
- Come back to automation later

**Option B:** Use public APIs
- Check if Siko has an API
- Use RSS feeds if available
- Parse sitemaps

### If Siko.cz Doesn't Work
**Option A:** Try different e-shop
- Baumax might be simpler
- XXXLutz might have better structure

**Option B:** Buy sample data
- Find product catalogs
- Use open datasets
- Scrape easier sites first

---

## 📊 Success Metrics

### Phase 1 Complete When:
- ✅ 100+ products in database
- ✅ >90% data completeness
- ✅ Schema validated
- ✅ Sample products tested
- ✅ Ready for LLM integration

### Target Timeline:
- **Iteration 1:** Day 1 (5 products)
- **Iteration 2:** Day 2-3 (50 products)
- **Iteration 3:** Day 4-5 (100+ products)
- **Phase 1 Done:** End of Week 1

---

## 🎯 Your Next Actions (Right Now!)

1. [ ] Run `npm install`
2. [ ] Add API key to `.env`
3. [ ] Visit Siko.cz - take notes
4. [ ] Write HTML structure doc
5. [ ] Extract your first 5 products

**Time to start:** ~1 hour  
**Reward:** Working prototype foundation!

---

Good luck! 🚀

**Remember:** Perfect is the enemy of done. Get something working, then improve it!
