import { enrichProduct } from '../llm/analyzeMoodboard.js';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import path from 'path';

/**
 * Enrich existing products with AI-generated style tags
 * This prepares products for better constraint filtering and matching
 */

/**
 * Enrich all products in a catalog file
 * @param {string} inputFile - Path to product JSON file
 * @param {Object} options - Enrichment options
 * @returns {Promise<Object>} Enrichment results
 */
export async function enrichProductCatalog(inputFile, options = {}) {
  const { maxProducts = null, saveEnriched = true } = options;

  console.log(`🏷️  Starting product enrichment for ${inputFile}...`);

  try {
    // Load products
    const products = JSON.parse(readFileSync(inputFile, 'utf8'));
    const productCount = maxProducts ? Math.min(maxProducts, products.length) : products.length;

    console.log(`📦 Enriching ${productCount} products...`);

    const enrichedProducts = [];
    const errors = [];
    let totalCost = 0;

    // Process each product
    for (let i = 0; i < productCount; i++) {
      const product = products[i];

      try {
        console.log(`${i + 1}/${productCount}: ${product.name?.substring(0, 50)}...`);

        // Skip if already enriched (unless forced)
        if (product.aiEnrichment && !options.forceReenrich) {
          console.log('   ↻ Already enriched, skipping');
          enrichedProducts.push(product);
          continue;
        }

        const enriched = await enrichProduct(product);
        enrichedProducts.push(enriched);

        if (enriched.aiEnrichment) {
          totalCost += enriched.aiEnrichment.cost || 0;
          console.log(`   ✅ Enriched! Cost: $${(enriched.aiEnrichment.cost || 0).toFixed(4)}`);
          console.log(`   🏷️  Style: ${enriched.aiEnrichment.styleTags?.slice(0, 2).join(', ') || 'none'}`);
          console.log(`   🏠 Rooms: ${enriched.aiEnrichment.roomTypes?.slice(0, 2).join(', ') || 'none'}`);
        } else {
          console.log('   ⚠️  Enrichment failed, keeping original');
          enrichedProducts.push(product);
        }

        // Small delay to be respectful to API
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
        errors.push({
          product: product.name,
          error: error.message
        });
        enrichedProducts.push(product); // Keep original
      }
    }

    // Save enriched products
    if (saveEnriched) {
      const timestamp = new Date().toISOString().split('T')[0];
      const outputPath = inputFile.replace('.json', `_enriched_${timestamp}.json`);

      writeFileSync(outputPath, JSON.stringify(enrichedProducts, null, 2));
      console.log(`💾 Saved enriched products to: ${outputPath}`);
    }

    const results = {
      inputFile,
      totalProducts: products.length,
      processedProducts: productCount,
      enrichedProducts: enrichedProducts.length,
      errors: errors.length,
      totalCost,
      enrichedAt: new Date().toISOString()
    };

    console.log(`✅ Product enrichment complete!`);
    console.log(`📊 Results:`);
    console.log(`   - Processed: ${results.processedProducts}/${results.totalProducts} products`);
    console.log(`   - Errors: ${results.errors}`);
    console.log(`   - Total cost: $${totalCost.toFixed(4)}`);

    return { results, enrichedProducts };

  } catch (error) {
    console.error('❌ Product enrichment failed:', error.message);
    throw error;
  }
}

/**
 * Find and enrich latest product file
 */
async function enrichLatestProducts() {
  const dataDir = './data/products';

  if (!existsSync(dataDir)) {
    throw new Error('No product data found. Run crawler first: npm run crawl:siko');
  }

  // Find latest file
  const files = readdirSync(dataDir, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && dirent.name.startsWith('siko_') && !dirent.name.includes('enriched'))
    .map(dirent => dirent.name)
    .sort()
    .reverse(); // Latest first

  if (files.length === 0) {
    throw new Error('No Siko product files found. Run crawler first: npm run crawl:siko');
  }

  const latestFile = files[0];
  const inputPath = path.join(dataDir, latestFile);

  console.log(`📁 Using latest product file: ${latestFile}`);

  const maxProducts = process.env.MAX_PRODUCTS ?
    (process.env.MAX_PRODUCTS === 'null' ? null : parseInt(process.env.MAX_PRODUCTS)) :
    null; // Default to all products

  return await enrichProductCatalog(inputPath, { maxProducts });
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  enrichLatestProducts()
    .then(({ results, enrichedProducts }) => {
      console.log(`\n🎉 Product enrichment completed!`);
      console.log(`💰 Total cost: $${results.totalCost.toFixed(4)}`);

      // Show sample enriched product
      const enrichedSample = enrichedProducts.find(p => p.aiEnrichment);
      if (enrichedSample) {
        console.log(`\n📋 Sample enriched product:`);
        console.log(`Name: ${enrichedSample.name.substring(0, 50)}...`);
        console.log(`Style tags: ${enrichedSample.aiEnrichment.styleTags?.join(', ') || 'none'}`);
        console.log(`Room types: ${enrichedSample.aiEnrichment.roomTypes?.join(', ') || 'none'}`);
        console.log(`Color tags: ${enrichedSample.aiEnrichment.colorTags?.join(', ') || 'none'}`);
      }

      console.log(`\n💡 Next steps:`);
      console.log(`1. Regenerate embeddings: npm run generate:embeddings`);
      console.log(`2. Test search: npm run test:search`);

      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Product enrichment failed:', error.message);
      process.exit(1);
    });
}

export { enrichLatestProducts };