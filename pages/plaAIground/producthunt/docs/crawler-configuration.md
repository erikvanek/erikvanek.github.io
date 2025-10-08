# Siko.cz Crawler Configuration

## Overview

The Siko.cz crawler (`src/crawler/siko.js`) is a comprehensive web scraper that extracts product information from Siko.cz with full pagination support and detailed product information extraction.

## Configuration Options

### Basic Configuration

```javascript
// In src/crawler/siko.js
const URL = 'https://www.siko.cz/sanitarni-keramika/c/C99803';
const MAX_PRODUCTS = 10; // Set limit for testing
const MAX_PAGES = 5;     // Safety limit for pagination
```

### Configuration Variables

| Variable | Type | Description | Default | Options |
|----------|------|-------------|---------|---------|
| `URL` | string | Target section URL | Sanitary ceramics | Any Siko.cz category URL |
| `MAX_PRODUCTS` | number/null | Max products to extract | 10 | Any number, or `null` for all |
| `MAX_PAGES` | number | Max pages to crawl | 5 | Any positive number |

## Running the Crawler

### NPM Scripts

```bash
# Test run (current configuration)
npm run crawl:siko

# Full crawl (all products - overrides MAX_PRODUCTS)
npm run crawl:siko:full

# All crawlers
npm run crawl:all
```

### Environment Variables

You can override configuration via environment variables:

```bash
# Crawl all products
MAX_PRODUCTS=null npm run crawl:siko

# Crawl specific amount
MAX_PRODUCTS=50 npm run crawl:siko

# Increase page limit
MAX_PAGES=10 npm run crawl:siko
```

## Different Siko.cz Sections

To crawl different product categories, change the URL:

```javascript
// Bathrooms - Sanitary ceramics (default)
const URL = 'https://www.siko.cz/sanitarni-keramika/c/C99803';

// Kitchens
const URL = 'https://www.siko.cz/kuchyne';

// Tiles
const URL = 'https://www.siko.cz/obklady-a-dlazby';

// Lighting
const URL = 'https://www.siko.cz/osvetleni';

// Bathroom furniture
const URL = 'https://www.siko.cz/koupelnovy-nabytek';
```

## Output Configuration

### Output Files

```javascript
// Current: timestamped files
const timestamp = new Date().toISOString().split('T')[0];
const outputPath = path.join(outputDir, `siko_all_products_${timestamp}.json`);
```

Generated files:
- `data/products/siko_all_products_2025-10-08.json`
- One file per run with timestamp

### Output Structure

Each product contains:

```json
{
  "name": "Product name in Czech",
  "price": "Price in CZK",
  "imageUrl": "Main product image URL",
  "productUrl": "Link to product page",
  "extractedAt": "ISO timestamp",
  "details": {
    "specifications": {
      "Rozměry": "Dimensions",
      "Výška": "Height",
      "Materiál": "Material",
      "Barva": "Color"
    },
    "materials": ["keramika", "sanitární", "bílá"],
    "description": "Product description/breadcrumbs",
    "technicalDetails": {
      "odpad": "Waste/drainage info",
      "montáž": "Installation info",
      "technologie": "Technology info"
    },
    "additionalImages": ["url1", "url2", ...],
    "detailsExtractedAt": "ISO timestamp",
    "debug": {
      "potentialSpecs": [...],
      "potentialMaterials": [...],
      "potentialDescriptions": [...]
    }
  }
}
```

## Performance Tuning

### Wait Times

```javascript
// Page load wait time
await page.waitForTimeout(3000);

// Between product detail requests
await page.waitForTimeout(1000);

// Between pagination pages
await page.waitForTimeout(2000);
```

### Browser Configuration

```javascript
// Browser launch options
browser = await chromium.launch({
  headless: true,  // Set to false for debugging
  slowMo: 0       // Add delay for debugging
});

// User agent for better compatibility
await page.setExtraHTTPHeaders({
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
});
```

## Error Handling

### Built-in Error Handling

- **Network timeouts**: 10s timeout for selectors
- **Missing elements**: Fallback to "N/A" values
- **Page load failures**: Graceful degradation
- **Pagination errors**: Stops crawling vs. crashing

### Debug Information

Each product includes debug information:
- `potentialSpecs`: Elements that might contain specifications
- `potentialMaterials`: Elements that might contain materials
- `potentialDescriptions`: Elements that might contain descriptions

## Troubleshooting

### Common Issues

1. **No products found**
   - Check if URL is correct
   - Verify selectors in `docs/siko-structure.md`
   - Increase wait times for slow loading

2. **Timeout errors**
   - Increase `page.waitForTimeout()` values
   - Check internet connection
   - Verify site availability

3. **Missing details**
   - Check debug output in generated JSON
   - Update selectors based on page changes
   - Verify Czech language attributes

### Debug Mode

Set `headless: false` to watch the browser:

```javascript
browser = await chromium.launch({ headless: false });
```

### Logging

The crawler provides extensive console output:
- Page-by-page progress
- Product extraction status
- Pagination information
- Final statistics

## Advanced Configuration

### Custom Selectors

Update selectors in the crawler code:

```javascript
// Product card containers
const selectors = [
  'siko-b2c-product-card',  // Primary selector
  '.product-card',          // Fallback
  // Add more fallbacks...
];

// Product detail selectors
const nameSelectors = [
  '.carousel-product-title',
  '.product-name',
  'h2', 'h3'
];
```

### Custom Data Extraction

Add new extraction functions:

```javascript
const getCustomField = () => {
  // Your custom extraction logic
  return extractedValue;
};

// Add to product details
technicalDetails: {
  ...details.technicalDetails,
  customField: getCustomField()
}
```

## Performance Recommendations

### For Development/Testing
- `MAX_PRODUCTS = 5-10`
- `MAX_PAGES = 1-2`
- Keep debug information

### For Production Data Collection
- `MAX_PRODUCTS = null` (all products)
- `MAX_PAGES = 10+` (or based on actual page count)
- Consider removing debug info to reduce file size

### For Large Scale Crawling
- Add delays between requests
- Use multiple browser instances
- Implement retry logic
- Consider IP rotation if needed