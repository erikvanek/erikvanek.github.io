import { analyzeMoodboard, refineMoodboard, enrichProduct } from './analyzeMoodboard.js';
import client from './client.js';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

/**
 * Test script for moodboard analysis functionality
 * Run with: node src/llm/testMoodboard.js
 */

// Sample interior design moodboard URLs for testing
const SAMPLE_MOODBOARDS = [
  {
    name: "Minimalist Bathroom",
    url: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    projectBrief: "Modern bathroom renovation for a Prague apartment. Budget: 200,000 CZK. Space: 8m². Looking for clean lines and quality materials.",
    constraints: ["budget: 200000 CZK", "size: 8m²", "style: modern"]
  },
  {
    name: "Scandinavian Kitchen",
    url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    projectBrief: "Scandinavian-style kitchen for young family. Light wood, white surfaces, functional storage.",
    constraints: ["style: scandinavian", "family-friendly", "storage important"]
  },
  {
    name: "Industrial Living Room",
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    projectBrief: "Industrial loft conversion. Exposed brick, metal elements, warm lighting.",
    constraints: ["style: industrial", "loft space", "keep exposed elements"]
  }
];

/**
 * Test moodboard analysis with sample images
 */
async function testMoodboardAnalysis() {
  console.log('🎨 Testing Moodboard Analysis...\n');

  for (const [index, moodboard] of SAMPLE_MOODBOARDS.entries()) {
    console.log(`${index + 1}. Testing: ${moodboard.name}`);
    console.log(`   URL: ${moodboard.url}`);
    console.log(`   Brief: ${moodboard.projectBrief}`);
    console.log(`   Constraints: ${moodboard.constraints.join(', ')}\n`);

    try {
      const startTime = Date.now();

      const designDNA = await analyzeMoodboard(moodboard.url, {
        projectBrief: moodboard.projectBrief,
        constraints: moodboard.constraints
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      if (designDNA.error) {
        console.log('   ❌ Error:', designDNA.error);
        console.log('   🔄 Using fallback analysis');
        console.log('   Fallback style:', designDNA.fallback.styleAnalysis.primary);
      } else {
        console.log('   ✅ Analysis successful!');
        console.log('   💰 Cost:', `$${designDNA.meta.cost.toFixed(4)}`);
        console.log('   ⏱️  Duration:', `${duration}ms`);
        console.log('   🎯 Primary Style:', designDNA.styleAnalysis.primary);
        console.log('   🎨 Colors:', designDNA.colorPalette.map(c => c.name).join(', '));
        console.log('   🏗️  Materials:', designDNA.materials.join(', '));
        console.log('   🏠 Room:', `${designDNA.roomContext.type} (${designDNA.roomContext.size})`);
        console.log('   🔍 Search Keywords:', designDNA.searchKeywords.czech.slice(0, 3).join(', '));
      }

      console.log(''); // Empty line between tests

      // Small delay to be respectful to API
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.log('   ❌ Test failed:', error.message);
      console.log('');
    }
  }
}

/**
 * Test conversational refinement
 */
async function testRefinement() {
  console.log('💬 Testing Conversational Refinement...\n');

  // Use the first moodboard for refinement test
  const moodboard = SAMPLE_MOODBOARDS[0];

  try {
    console.log('1. Initial analysis...');
    const originalDNA = await analyzeMoodboard(moodboard.url, {
      projectBrief: moodboard.projectBrief,
      constraints: moodboard.constraints
    });

    let workingDNA = originalDNA;
    if (originalDNA.error) {
      console.log('   Using fallback for refinement test');
      workingDNA = originalDNA.fallback;
    }

    console.log('   Original style:', originalDNA.styleAnalysis?.primary || 'unknown');
    console.log('   Original mood:', originalDNA.mood?.atmosphere?.join(', ') || 'unknown');

    // Test refinement with different feedback
    const refinements = [
      "Make it warmer and cozier",
      "More minimalist, less clutter",
      "Darker colors, more dramatic"
    ];

    for (const [index, feedback] of refinements.entries()) {
      console.log(`\n${index + 2}. Refining with: "${feedback}"`);

      const refinedDNA = await refineMoodboard(workingDNA, feedback);

      console.log('   ✅ Refinement successful!');
      console.log('   💰 Cost:', `$${refinedDNA.meta.refinementCost?.toFixed(4) || '0.0000'}`);
      console.log('   🎯 Refined style:', refinedDNA.styleAnalysis?.primary || 'unchanged');
      console.log('   🎨 Refined mood:', refinedDNA.mood?.atmosphere?.join(', ') || 'unchanged');

      // Small delay
      await new Promise(resolve => setTimeout(resolve, 500));
    }

  } catch (error) {
    console.log('   ❌ Refinement test failed:', error.message);
  }

  console.log('');
}

/**
 * Test product enrichment with real Siko data
 */
async function testProductEnrichment() {
  console.log('🏷️  Testing Product Enrichment...\n');

  // Find the latest Siko products file
  const dataDir = './data/products';

  if (!existsSync(dataDir)) {
    console.log('   ❌ No product data found. Run crawler first: npm run crawl:siko');
    return;
  }

  const { readdirSync } = await import('fs');
  const files = readdirSync(dataDir, { withFileTypes: true })
    .filter(dirent => dirent.isFile() && dirent.name.startsWith('siko_'))
    .map(dirent => dirent.name);

  if (files.length === 0) {
    console.log('   ❌ No Siko product files found. Run crawler first: npm run crawl:siko');
    return;
  }

  const latestFile = files.sort().reverse()[0];
  const productsPath = path.join(dataDir, latestFile);

  try {
    const products = JSON.parse(readFileSync(productsPath, 'utf8'));
    console.log(`   📁 Loading ${products.length} products from ${latestFile}`);

    // Test enrichment on first 3 products
    for (let i = 0; i < Math.min(3, products.length); i++) {
      const product = products[i];
      console.log(`\n   ${i + 1}. Enriching: ${product.name?.substring(0, 50)}...`);

      const enriched = await enrichProduct(product);

      if (enriched.aiEnrichment) {
        console.log('      ✅ Enrichment successful!');
        console.log('      💰 Cost:', `$${enriched.aiEnrichment.cost.toFixed(4)}`);
        console.log('      🏷️  Style tags:', enriched.aiEnrichment.styleTags?.join(', ') || 'none');
        console.log('      🏠 Room types:', enriched.aiEnrichment.roomTypes?.join(', ') || 'none');
        console.log('      🎨 Color tags:', enriched.aiEnrichment.colorTags?.join(', ') || 'none');
      } else {
        console.log('      ❌ Enrichment failed');
      }

      // Small delay
      await new Promise(resolve => setTimeout(resolve, 500));
    }

  } catch (error) {
    console.log('   ❌ Product enrichment test failed:', error.message);
  }

  console.log('');
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log('🧪 Starting LLM Integration Tests\n');
  console.log('='.repeat(50));

  const startTime = Date.now();

  try {
    await testMoodboardAnalysis();
    await testRefinement();
    await testProductEnrichment();

    const endTime = Date.now();
    const totalDuration = endTime - startTime;

    console.log('='.repeat(50));
    console.log('📊 Test Summary');
    console.log('='.repeat(50));
    console.log('⏱️  Total Duration:', `${totalDuration}ms (${(totalDuration / 1000).toFixed(1)}s)`);
    console.log('💰 Total Cost:', `$${client.getTotalCosts().total.toFixed(4)}`);
    console.log('🔢 Total API Calls:', client.getTotalCosts().calls);
    console.log('📝 Total Tokens:', `${client.getTotalCosts().tokens.input + client.getTotalCosts().tokens.output}`);

  } catch (error) {
    console.log('❌ Test suite failed:', error.message);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests();
}

export { runAllTests, testMoodboardAnalysis, testRefinement, testProductEnrichment };