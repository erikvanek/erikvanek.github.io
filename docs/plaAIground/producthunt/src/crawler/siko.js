/**
 * Siko.cz Crawler
 *
 * Crawls products from Siko.cz (bathrooms, kitchens, tiles, lighting)
 * Start with bathroom fixtures as first category
 */

import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const URL = 'https://www.siko.cz/sanitarni-keramika/c/C99803';
const MAX_PRODUCTS = 10; // Set limit for initial testing - set to null for all products
const MAX_PAGES = 5; // Limit to prevent infinite loops

/**
 * Check for pagination and extract pagination info
 */
async function getPaginationInfo(page) {
  try {
    const paginationInfo = await page.evaluate(() => {
      // Look for common pagination selectors
      const paginationSelectors = [
        '.pagination',
        '[class*="pagination"]',
        '.pager',
        '[class*="pager"]',
        '.page-nav',
        '[class*="page"]',
        'nav[aria-label*="page"]'
      ];

      let paginationContainer = null;
      for (const selector of paginationSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          paginationContainer = elements[0];
          break;
        }
      }

      if (!paginationContainer) {
        return { hasNext: false, totalPages: 1, currentPage: 1 };
      }

      // Look for "Next" button or similar
      const nextSelectors = [
        'a[aria-label*="next"]',
        'a[title*="next"]',
        '.next',
        '[class*="next"]',
        'a:contains("Next")',
        'a:contains("Další")',
        'a:contains(">")'
      ];

      let hasNext = false;
      let nextUrl = null;

      // Check all links for next page indicators
      const links = paginationContainer.querySelectorAll('a');
      Array.from(links).forEach(link => {
        const text = link.textContent.toLowerCase().trim();
        const className = (link.className && link.className.toString) ? link.className.toString().toLowerCase() : '';
        const title = (link.title || '').toLowerCase();
        const ariaLabel = (link.getAttribute('aria-label') || '').toLowerCase();

        if (text.includes('next') || text.includes('další') || text === '>' ||
            className.includes('next') || title.includes('next') || ariaLabel.includes('next')) {
          if (link.href && !link.disabled && !link.classList.contains('disabled')) {
            hasNext = true;
            nextUrl = link.href;
          }
        }
      });

      // Try to find current page and total pages
      let currentPage = 1;
      let totalPages = 1;

      const pageNumbers = Array.from(paginationContainer.querySelectorAll('a, span'))
        .map(el => {
          const text = el.textContent.trim();
          const num = parseInt(text);
          return !isNaN(num) ? num : null;
        })
        .filter(num => num !== null);

      if (pageNumbers.length > 0) {
        totalPages = Math.max(...pageNumbers);

        // Find current page (usually marked with a special class or as span)
        const activeElements = paginationContainer.querySelectorAll('.active, .current, [aria-current="page"]');
        if (activeElements.length > 0) {
          const activeText = activeElements[0].textContent.trim();
          const activeNum = parseInt(activeText);
          if (!isNaN(activeNum)) {
            currentPage = activeNum;
          }
        }
      }

      return {
        hasNext,
        nextUrl,
        currentPage,
        totalPages,
        paginationHtml: paginationContainer.outerHTML.substring(0, 500)
      };
    });

    return paginationInfo;
  } catch (error) {
    console.warn('Error getting pagination info:', error.message);
    return { hasNext: false, totalPages: 1, currentPage: 1 };
  }
}

/**
 * Extract products from current page
 */
async function extractProductsFromCurrentPage(page) {
  console.log('Extracting products from current page...');

  const selectors = [
    '.siko-carousel-card',
    'siko-b2c-product-card',
    '[data-product]',
    '.product-card',
    '.product-item',
    'article',
    '.tile-item'
  ];

  let productCards = [];
  for (const selector of selectors) {
    try {
      await page.waitForSelector(selector, { timeout: 2000 });
      productCards = await page.evaluate((sel) => {
        return Array.from(document.querySelectorAll(sel)).length;
      }, selector);
      console.log(`Found ${productCards} elements with selector: ${selector}`);
      if (productCards > 0) break;
    } catch (e) {
      console.log(`Selector ${selector} not found, trying next...`);
    }
  }

  const products = await page.evaluate(() => {
    const selectors = [
      '.siko-carousel-card',
      'siko-b2c-product-card',
      '[data-product]',
      '.product-card',
      '.product-item',
      'article',
      '.tile-item'
    ];

    let productCards = [];
    for (const selector of selectors) {
      productCards = document.querySelectorAll(selector);
      if (productCards.length > 0) {
        console.log(`Using selector: ${selector}, found ${productCards.length} items`);
        break;
      }
    }

    const productList = [];

    for (let i = 0; i < productCards.length; i++) {
      const card = productCards[i];

      try {
        const nameSelectors = ['.carousel-product-title', '.product-name', 'h2', 'h3', '[data-testid*="name"]', '.title'];
        const priceSelectors = ['.price', '[data-testid*="price"]', '.cost', '.amount'];
        const imageSelectors = ['.carousel-product-image', '.image-responsive', 'img', '[data-testid*="image"]'];
        const linkSelectors = ['a', '[href]'];

        let name = 'N/A';
        for (const sel of nameSelectors) {
          const el = card.querySelector(sel);
          if (el && el.textContent.trim()) {
            name = el.textContent.trim();
            break;
          }
        }

        let price = 'N/A';
        for (const sel of priceSelectors) {
          const el = card.querySelector(sel);
          if (el && el.textContent.trim()) {
            price = el.textContent.trim();
            break;
          }
        }

        let imageUrl = 'N/A';
        for (const sel of imageSelectors) {
          const el = card.querySelector(sel);
          if (el && (el.src || el.dataset.src)) {
            imageUrl = el.src || el.dataset.src;
            break;
          }
        }

        let productUrl = 'N/A';
        for (const sel of linkSelectors) {
          const el = card.querySelector(sel);
          if (el && el.href) {
            productUrl = el.href;
            break;
          }
        }

        const product = {
          name,
          price,
          imageUrl,
          productUrl,
          extractedAt: new Date().toISOString(),
          html: card.outerHTML.substring(0, 300) + '...'
        };

        productList.push(product);
      } catch (error) {
        console.warn(`Error extracting product ${i + 1}:`, error.message);
      }
    }

    return productList;
  });

  return products;
}

/**
 * Extract detailed product information from a product page
 */
async function extractProductDetails(page, productUrl) {
  try {
    console.log(`  Visiting product page: ${productUrl}`);
    await page.goto(productUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const details = await page.evaluate(() => {
      // Debug function to explore available content
      const debugPageContent = () => {
        const debug = {};

        // Find all potential spec/detail containers
        const allElements = document.querySelectorAll('*');
        const potentialSpecs = [];
        const potentialMaterials = [];
        const potentialDescriptions = [];

        Array.from(allElements).forEach(el => {
          const className = (el.className && el.className.toString) ? el.className.toString() : (el.className || '');
          const text = el.textContent || '';

          // Look for specification-related elements
          if (className.includes('spec') || className.includes('attribute') ||
              className.includes('detail') || className.includes('property') ||
              text.includes('Rozměry') || text.includes('Materiál') || text.includes('Barva')) {
            potentialSpecs.push({
              tag: el.tagName,
              class: className,
              text: text.substring(0, 100) + (text.length > 100 ? '...' : '')
            });
          }

          // Look for material info
          if (className.includes('material') || text.includes('keramika') ||
              text.includes('porcelán') || text.includes('sanitární')) {
            potentialMaterials.push({
              tag: el.tagName,
              class: className,
              text: text.substring(0, 100) + (text.length > 100 ? '...' : '')
            });
          }

          // Look for descriptions
          if ((className.includes('desc') || className.includes('info') ||
               className.includes('content')) && text.length > 50) {
            potentialDescriptions.push({
              tag: el.tagName,
              class: className,
              text: text.substring(0, 200) + (text.length > 200 ? '...' : '')
            });
          }
        });

        return {
          potentialSpecs: potentialSpecs.slice(0, 10),
          potentialMaterials: potentialMaterials.slice(0, 5),
          potentialDescriptions: potentialDescriptions.slice(0, 5)
        };
      };

      const getSpecifications = () => {
        const specs = {};

        // Try to find product specifications in various formats
        const specSelectors = [
          'table',
          '.attributes',
          '[class*="spec"]',
          '[class*="attribute"]',
          '[class*="detail"]',
          '[class*="property"]',
          '[class*="info"]'
        ];

        for (const selector of specSelectors) {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            // Try table format
            const rows = element.querySelectorAll('tr');
            rows.forEach(row => {
              const cells = row.querySelectorAll('td, th');
              if (cells.length >= 2) {
                const key = cells[0].textContent.trim();
                const value = cells[1].textContent.trim();
                if (key && value && key !== value && key.length < 100 && value.length < 100) {
                  specs[key] = value;
                }
              }
            });

            // Try div/span pairs
            const labels = element.querySelectorAll('[class*="label"], [class*="key"], [class*="name"]');
            labels.forEach(label => {
              const value = label.nextElementSibling;
              if (value) {
                const key = label.textContent.trim();
                const val = value.textContent.trim();
                if (key && val && key !== val && key.length < 100 && val.length < 100) {
                  specs[key] = val;
                }
              }
            });
          });
          if (Object.keys(specs).length > 0) break;
        }

        // Also search for common Czech product attributes
        const czechAttributes = [
          'Rozměry', 'Výška', 'Šířka', 'Délka', 'Hmotnost', 'Materiál', 'Barva',
          'Povrchová úprava', 'Typ', 'Série', 'Značka', 'Záruka'
        ];

        // Search manually for Czech attributes since :contains is not supported
        const allElements = document.querySelectorAll('*');
        czechAttributes.forEach(attr => {
          Array.from(allElements).forEach(el => {
            const text = el.textContent || '';
            if (text.includes(attr + ':') || text.includes(attr + ' ')) {
              const match = text.match(new RegExp(attr + '\\s*:?\\s*([^\\n,]{1,50})'));
              if (match && match[1] && match[1].trim() && !specs[attr]) {
                specs[attr] = match[1].trim();
              }
            }
          });
        });

        return specs;
      };

      const getMaterials = () => {
        const materials = [];

        // Look for material information in various places
        const materialKeywords = ['keramika', 'porcelán', 'sanitární', 'bílá', 'matná', 'lesklá'];
        const allText = document.body.textContent.toLowerCase();

        materialKeywords.forEach(keyword => {
          if (allText.includes(keyword)) {
            materials.push(keyword);
          }
        });

        // Also look for specific material sections
        const materialSelectors = [
          '[class*="material"]',
          '[class*="specification"]',
          '.product-info'
        ];

        materialSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            const text = el.textContent.toLowerCase();
            materialKeywords.forEach(keyword => {
              if (text.includes(keyword) && !materials.includes(keyword)) {
                materials.push(keyword);
              }
            });
          });
        });

        return [...new Set(materials)]; // Remove duplicates
      };

      const getDescription = () => {
        const descSelectors = [
          '.product-description',
          '[class*="description"]',
          '.product-info',
          '.content',
          '[class*="content"]',
          'p'
        ];

        for (const selector of descSelectors) {
          const elements = document.querySelectorAll(selector);
          for (const el of elements) {
            const text = el.textContent.trim();
            if (text.length > 50 && text.length < 1000 &&
                !text.includes('cookie') && !text.includes('Google') &&
                (text.includes('WC') || text.includes('toaleta') || text.includes('záchodová'))) {
              return text;
            }
          }
        }

        return null;
      };

      const getTechnicalDetails = () => {
        const details = {};

        // Extract any technical information from the page
        const technicalKeywords = [
          'odpad', 'montáž', 'typ', 'série', 'kolekce', 'design',
          'funkce', 'technologie', 'certifikát', 'norma'
        ];

        const allElements = document.querySelectorAll('*');
        Array.from(allElements).forEach(el => {
          const text = el.textContent.trim();
          technicalKeywords.forEach(keyword => {
            const regex = new RegExp(`${keyword}\\s*:?\\s*([^\\n,]{1,100})`, 'i');
            const match = text.match(regex);
            if (match && match[1] && match[1].trim()) {
              details[keyword] = match[1].trim();
            }
          });
        });

        return details;
      };

      const getImages = () => {
        const images = [];
        const imgs = document.querySelectorAll('img');

        imgs.forEach(img => {
          if (img.src &&
              (img.src.includes('siko') || img.src.includes('product') || img.src.includes('SAT')) &&
              !img.src.includes('icon') && !img.src.includes('label') &&
              !images.includes(img.src)) {
            images.push(img.src);
          }
        });

        return images.slice(0, 8); // Get more images
      };

      const debug = debugPageContent();

      return {
        specifications: getSpecifications(),
        materials: getMaterials(),
        description: getDescription(),
        technicalDetails: getTechnicalDetails(),
        images: getImages(),
        debug: debug,
        url: window.location.href,
        extractedAt: new Date().toISOString()
      };
    });

    return details;

  } catch (error) {
    console.warn(`  Error extracting details from ${productUrl}:`, error.message);
    return {
      specifications: {},
      materials: [],
      description: null,
      technicalDetails: {},
      images: [],
      debug: { error: 'Failed to extract debug info' },
      url: productUrl,
      extractedAt: new Date().toISOString(),
      error: error.message
    };
  }
}

/**
 * Main crawler function
 */
async function crawlSiko() {
  let browser;

  try {
    console.log('Starting Siko.cz crawler with pagination support...');

    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    let allProducts = [];
    let currentPage = 1;
    let currentUrl = URL;

    while (currentPage <= MAX_PAGES) {
      console.log(`\n=== Page ${currentPage} ===`);
      console.log(`Navigating to ${currentUrl}...`);

      await page.goto(currentUrl, { waitUntil: 'networkidle' });

      console.log('Waiting for JavaScript to load content...');
      await page.waitForTimeout(3000);

      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight / 2);
      });
      await page.waitForTimeout(1000);

      if (currentPage === 1) {
        console.log('Checking page content...');
        const pageContent = await page.evaluate(() => {
          const allElements = document.querySelectorAll('*');
          const classNames = new Set();
          Array.from(allElements).forEach(el => {
            const className = (el.className && el.className.toString) ? el.className.toString() : (el.className || '');
            if (className) {
              className.split(' ').forEach(cls => {
                if (cls.includes('product') || cls.includes('card') || cls.includes('item') || cls.includes('tile')) {
                  classNames.add('.' + cls);
                }
              });
            }
          });

          return {
            title: document.title,
            url: window.location.href,
            productCards: document.querySelectorAll('siko-b2c-product-card').length,
            allCards: document.querySelectorAll('[class*="product"]').length,
            potentialSelectors: Array.from(classNames).slice(0, 10)
          };
        });
        console.log('Page info:', pageContent);
      }

      // Extract products from current page
      const pageProducts = await extractProductsFromCurrentPage(page);

      if (pageProducts.length === 0) {
        console.log('No products found on this page, stopping pagination.');
        break;
      }

      console.log(`Found ${pageProducts.length} products on page ${currentPage}`);
      allProducts.push(...pageProducts);

      // Check if we should continue with more products or reached limit
      if (MAX_PRODUCTS && allProducts.length >= MAX_PRODUCTS) {
        console.log(`Reached maximum products limit (${MAX_PRODUCTS}), stopping.`);
        allProducts = allProducts.slice(0, MAX_PRODUCTS);
        break;
      }

      // Check for pagination
      const paginationInfo = await getPaginationInfo(page);
      console.log('Pagination info:', {
        hasNext: paginationInfo.hasNext,
        currentPage: paginationInfo.currentPage,
        totalPages: paginationInfo.totalPages
      });

      if (!paginationInfo.hasNext || !paginationInfo.nextUrl) {
        console.log('No more pages available, stopping pagination.');
        break;
      }

      currentUrl = paginationInfo.nextUrl;
      currentPage++;

      // Add delay between pages
      await page.waitForTimeout(2000);
    }

    if (allProducts.length === 0) {
      throw new Error('No products found. Check if selectors are correct.');
    }

    console.log(`\n=== Summary ===`);
    console.log(`Total products extracted from ${currentPage - 1} pages: ${allProducts.length}`);

    console.log('Extracting detailed product information...');
    for (let i = 0; i < allProducts.length; i++) {
      const product = allProducts[i];
      if (product.productUrl && product.productUrl !== 'N/A') {
        console.log(`Processing product ${i + 1}/${allProducts.length}: ${product.name}`);

        const details = await extractProductDetails(page, product.productUrl);

        allProducts[i] = {
          ...product,
          details: {
            specifications: details.specifications,
            materials: details.materials,
            description: details.description,
            technicalDetails: details.technicalDetails,
            additionalImages: details.images,
            detailsExtractedAt: details.extractedAt,
            debug: details.debug,
            ...(details.error && { detailsError: details.error })
          }
        };

        await page.waitForTimeout(1000);
      } else {
        console.log(`Skipping product ${i + 1}/${allProducts.length}: No valid URL`);
      }
    }

    const outputDir = path.join(__dirname, '../../data/products');
    await fs.mkdir(outputDir, { recursive: true });

    const timestamp = new Date().toISOString().split('T')[0];
    const outputPath = path.join(outputDir, `siko_all_products_${timestamp}.json`);
    await fs.writeFile(outputPath, JSON.stringify(allProducts, null, 2), 'utf8');

    console.log(`\n=== Final Results ===`);
    console.log(`Data saved to ${outputPath}`);
    console.log(`Total products with details: ${allProducts.length}`);
    console.log('\nProduct summary:');
    allProducts.forEach((product, index) => {
      const specsCount = product.details?.specifications ? Object.keys(product.details.specifications).length : 0;
      const imagesCount = product.details?.additionalImages?.length || 0;
      const materialsCount = product.details?.materials?.length || 0;
      const techCount = product.details?.technicalDetails ? Object.keys(product.details.technicalDetails).length : 0;
      const hasDesc = product.details?.description ? 'YES' : 'NO';
      console.log(`${index + 1}. ${product.name} - ${product.price}`);
      console.log(`   Specs: ${specsCount}, Materials: ${materialsCount}, Tech: ${techCount}, Images: ${imagesCount}, Desc: ${hasDesc}`);
    });

    return allProducts;

  } catch (error) {
    console.error('Crawler error:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  crawlSiko()
    .then(() => {
      console.log('Crawler finished successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Crawler failed:', error);
      process.exit(1);
    });
}

export { crawlSiko };
