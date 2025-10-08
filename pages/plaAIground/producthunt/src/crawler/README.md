# Crawler Module

## Purpose
Scrape product data from Czech e-commerce sites and store in structured format.

## E-shops to Crawl
1. **Siko** (siko.cz) - Bathrooms, kitchens [START HERE]
2. **Baumax** (baumax.cz) - Home improvement
3. **Hornbach** (hornbach.cz) - DIY & building materials
4. **XXXLutz** (xxxlutz.cz) - Furniture
5. **Sconto** (sconto-nabytek.cz) - Budget furniture

## Files
- `siko.js` - Siko.cz crawler (start here)
- `baumax.js` - Baumax crawler
- `hornbach.js` - Hornbach crawler
- `xxxlutz.js` - XXXLutz crawler
- `sconto.js` - Sconto crawler
- `utils.js` - Shared utilities (rate limiting, error handling)
- `schema.js` - Product data schema validation

## Product Schema
```javascript
{
  id: string (uuid),
  source: string,
  name: string,
  category: string,
  price: number,
  currency: string,
  dimensions: { width, height, depth, unit },
  materials: string[],
  colors: string[],
  style_tags: string[],
  images: string[],
  url: string,
  availability: string,
  has_3d_model: boolean,
  description: string,
  scraped_at: ISO date string
}
```

## Usage
```bash
# Crawl single site
npm run crawl:siko

# Crawl all sites
npm run crawl:all
```

## Tips for Development
1. Start with static pages (product listings)
2. Use Playwright only if pages are heavily JavaScript-rendered
3. Add delays between requests (1000ms minimum)
4. Implement proper error handling
5. Save progress incrementally
6. Validate data before saving

## Next Steps
- [ ] Build Siko.cz crawler
- [ ] Test with 100 products
- [ ] Validate data quality
- [ ] Create sample dataset
