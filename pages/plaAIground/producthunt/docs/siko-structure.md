# Siko.cz Structure

## Product Listing
- URL: https://www.siko.cz/sanitarni-keramika/c/C99803
- Products per page: 24 (actual count found)
- Product card selector: `siko-b2c-product-card`
- Name: Dynamic selectors (`.carousel-product-title`, `.product-name`, `h2`, `h3`)
- Price: Dynamic selectors (`.price`, cost selectors)
- Image: Dynamic selectors (`.carousel-product-image`, `.image-responsive`, `img`)

### Product Cards Structure
- Main container: `siko-b2c-product-card`
- Each card contains: name, price, image, product URL
- Cards are dynamically loaded with JavaScript
- Wait time needed: 3-5 seconds for full page load

### Working Selectors Found
- `.carousel-product-title` - Product names
- `.price` - Product prices
- `.carousel-product-image`, `img` - Product images
- `a` tags within cards - Product URLs

## Product Detail Pages
- Specifications: Dynamic extraction from multiple selectors
- Materials: Detected keywords (`keramika`, `sanitární`, `bílá`, `matná`)
- Description: Breadcrumb navigation text
- Technical Details: Extracted from content (`odpad`, `montáž`, `typ`, etc.)
- Images: Multiple high-resolution product images (6-8 per product)

### Specification Extraction
- Czech attributes: `Rozměry`, `Výška`, `Šířka`, `Hmotnost`, `Materiál`, `Barva`, `Série`, `Značka`
- Table-based specs from various table selectors
- Key-value pairs from text content

### Materials Detection
Keywords automatically detected:
- `keramika` (ceramic)
- `sanitární` (sanitary)
- `bílá` (white)
- `matná` (matte)

### Technical Details Extraction
Automatically extracts:
- `odpad` (waste/drainage)
- `montáž` (installation)
- `typ` (type)
- `série` (series)
- `design` (design)
- `technologie` (technology)
- `certifikát` (certificate)
- `norma` (standard/norm)
- `funkce` (function)

## Pagination
- **Current section has no pagination** - all 24 products on single page
- Pagination detection implemented for future sections
- Supports Czech ("Další") and English ("Next") navigation
- Auto-detection of current page and total pages
- Safe pagination with MAX_PAGES limit

### Pagination Selectors (for other sections)
- Container: `.pagination`, `[class*="pagination"]`, `.pager`
- Next button: text contains "next", "další", ">"
- Page numbers: extracted from links and spans
- Active page: `.active`, `.current`, `[aria-current="page"]`