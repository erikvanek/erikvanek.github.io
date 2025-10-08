# Data Directory

## Purpose
Store all scraped data, embeddings, and tracking files.

## Structure
```
data/
├── products/          # Scraped product catalogs (JSON)
│   ├── siko_2025-10-08.json
│   ├── baumax_2025-10-08.json
│   └── ...
├── embeddings/        # Pre-computed vector embeddings
│   └── products.db
├── costs.json         # API cost tracking
└── products.db        # SQLite database (optional)
```

## Files

### products/
JSON files with product data from each e-shop.
- One file per crawl run
- Format: `{eshop}_{date}.json`
- Contains array of product objects

### embeddings/
Vector embeddings for semantic search.
- Generated from product descriptions
- Used for fast similarity matching

### costs.json
Tracks all Claude API usage:
```json
[
  {
    "model": "claude-haiku-3-5-20241022",
    "inputTokens": 1234,
    "outputTokens": 567,
    "cost": 0.0012,
    "timestamp": "2025-10-08T10:30:00Z"
  }
]
```

## Data Not in Git
All files in this directory are ignored by git (see `.gitignore`).
This keeps the repository clean and protects API cost data.

## Backup Strategy
- Products: Re-crawlable (source of truth is the e-shop)
- Embeddings: Re-generatable from products
- Costs: Important! Back up regularly

## Sample Data
For development, create sample files:
```bash
# Create sample product
echo '[{
  "id": "sample-1",
  "source": "siko",
  "name": "Test Product",
  "price": 1999,
  "currency": "CZK"
}]' > data/products/sample.json
```
