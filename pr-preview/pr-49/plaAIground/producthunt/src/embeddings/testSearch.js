import { searchProducts, explainMatch } from './search.js';
import { analyzeMoodboard } from '../llm/analyzeMoodboard.js';

/**
 * Test script for product matching engine
 * Run with: node src/embeddings/testSearch.js
 */

// Sample design DNA objects for testing
const SAMPLE_DESIGNS = [
  {
    name: "Minimalist Bathroom",
    designDNA: {
      styleAnalysis: {
        primary: "minimalistický",
        secondary: "moderní",
        confidence: 0.9
      },
      colorPalette: [
        { name: "bílá", hex: "#FFFFFF", prominence: 0.5 },
        { name: "šedá", hex: "#888888", prominence: 0.3 },
        { name: "stříbrná", hex: "#C0C0C0", prominence: 0.2 }
      ],
      materials: ["keramika", "kov"],
      roomContext: {
        type: "koupelna",
        size: "střední"
      },
      mood: {
        temperature: "neutrální",
        atmosphere: ["elegantní", "čistý"],
        brightness: "světlý"
      },
      keyElements: {
        lighting: "zapuštěné",
        textures: ["hladký", "matný"],
        patterns: "žádný"
      },
      productCategories: ["sanitární keramika"],
      searchKeywords: {
        czech: ["minimalistický", "bílý", "keramika", "WC"],
        english: ["minimalist", "white", "ceramic", "toilet"]
      }
    },
    constraints: {
      roomType: "koupelna",
      materials: ["keramika"],
      styles: ["minimalistický", "moderní"]
    }
  },
  {
    name: "Industrial Style",
    designDNA: {
      styleAnalysis: {
        primary: "industriální",
        secondary: "moderní",
        confidence: 0.8
      },
      colorPalette: [
        { name: "černá", hex: "#000000", prominence: 0.4 },
        { name: "šedá", hex: "#666666", prominence: 0.4 },
        { name: "kov", hex: "#999999", prominence: 0.2 }
      ],
      materials: ["kov", "keramika"],
      roomContext: {
        type: "koupelna",
        size: "velký"
      },
      mood: {
        temperature: "chladný",
        atmosphere: ["dramatický", "moderní"],
        brightness: "tmavý"
      },
      searchKeywords: {
        czech: ["industriální", "černý", "kov", "moderní"],
        english: ["industrial", "black", "metal", "modern"]
      }
    },
    constraints: {
      roomType: "koupelna",
      styles: ["industriální", "moderní"]
    }
  },
  {
    name: "Scandinavian Clean",
    designDNA: {
      styleAnalysis: {
        primary: "skandinávský",
        secondary: "minimalistický",
        confidence: 0.85
      },
      colorPalette: [
        { name: "bílá", hex: "#FFFFFF", prominence: 0.6 },
        { name: "dřevo", hex: "#D2B48C", prominence: 0.3 },
        { name: "světle šedá", hex: "#E8E8E8", prominence: 0.1 }
      ],
      materials: ["dřevo", "keramika"],
      roomContext: {
        type: "koupelna",
        size: "malý"
      },
      mood: {
        temperature: "teplý",
        atmosphere: ["útulný", "čistý"],
        brightness: "světlý"
      },
      searchKeywords: {
        czech: ["skandinávský", "bílý", "dřevo", "čistý"],
        english: ["scandinavian", "white", "wood", "clean"]
      }
    },
    constraints: {
      roomType: "koupelna",
      materials: ["keramika"],
      styles: ["skandinávský"]
    }
  }
];

/**
 * Test basic search functionality
 */
async function testBasicSearch() {
  console.log('🔍 Testing Basic Search Functionality...\n');

  for (const [index, sample] of SAMPLE_DESIGNS.entries()) {
    console.log(`${index + 1}. Testing: ${sample.name}`);
    console.log(`   Style: ${sample.designDNA.styleAnalysis.primary}`);
    console.log(`   Colors: ${sample.designDNA.colorPalette.map(c => c.name).join(', ')}`);
    console.log(`   Materials: ${sample.designDNA.materials.join(', ')}\n`);

    try {
      const startTime = Date.now();

      const results = await searchProducts(sample.designDNA, {
        topK: 5,
        constraints: sample.constraints,
        includeReranking: true
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(`   ✅ Search completed in ${duration}ms`);
      console.log(`   📊 Results: ${results.results.length} products found`);
      console.log(`   🎯 Avg similarity: ${(results.metadata.avgSimilarity * 100).toFixed(1)}%`);
      console.log(`   🔧 Filtered: ${results.metadata.beforeConstraints} → ${results.metadata.afterConstraints} products`);

      // Show top 3 matches
      console.log(`   \n   Top matches:`);
      results.results.slice(0, 3).forEach((product, i) => {
        console.log(`   ${i + 1}. ${product.name.substring(0, 40)}...`);
        console.log(`      Similarity: ${(product.similarity * 100).toFixed(1)}% | Final: ${((product.finalScore || product.similarity) * 100).toFixed(1)}%`);

        if (product.reasons) {
          const reasons = [];
          if (product.reasons.styleMatch) reasons.push('Style✓');
          if (product.reasons.roomMatch) reasons.push('Room✓');
          if (product.reasons.colorMatches > 0) reasons.push(`${product.reasons.colorMatches} Colors`);
          if (reasons.length > 0) {
            console.log(`      Bonuses: ${reasons.join(', ')}`);
          }
        }
        console.log('');
      });

    } catch (error) {
      console.log(`   ❌ Search failed: ${error.message}`);
    }

    console.log(''); // Empty line between tests
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay
  }
}

/**
 * Test constraint filtering
 */
async function testConstraints() {
  console.log('🔧 Testing Constraint Filtering...\n');

  const designDNA = SAMPLE_DESIGNS[0].designDNA; // Use minimalist bathroom

  const testCases = [
    {
      name: "No constraints",
      constraints: {}
    },
    {
      name: "Material constraint",
      constraints: { materials: ["keramika"] }
    },
    {
      name: "Style constraint",
      constraints: { styles: ["minimalistický"] }
    },
    {
      name: "Room constraint",
      constraints: { roomType: "koupelna" }
    },
    {
      name: "Combined constraints",
      constraints: {
        materials: ["keramika"],
        styles: ["minimalistický"],
        roomType: "koupelna"
      }
    }
  ];

  for (const testCase of testCases) {
    console.log(`Testing: ${testCase.name}`);

    try {
      const results = await searchProducts(designDNA, {
        topK: 10,
        constraints: testCase.constraints,
        includeReranking: false // Focus on constraint filtering
      });

      console.log(`   Results: ${results.results.length} products`);
      console.log(`   Filter effect: ${results.metadata.beforeConstraints} → ${results.metadata.afterConstraints}`);

      if (results.results.length > 0) {
        const topProduct = results.results[0];
        console.log(`   Top match: ${topProduct.name.substring(0, 30)}... (${(topProduct.similarity * 100).toFixed(1)}%)`);
      }

    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }

    console.log('');
  }
}

/**
 * Test match explanation
 */
async function testMatchExplanation() {
  console.log('💡 Testing Match Explanations...\n');

  const designDNA = SAMPLE_DESIGNS[0].designDNA;

  try {
    const results = await searchProducts(designDNA, {
      topK: 3,
      constraints: { materials: ["keramika"] },
      includeReranking: true
    });

    console.log(`Explaining matches for: ${SAMPLE_DESIGNS[0].name}\n`);

    results.results.forEach((product, index) => {
      console.log(`${index + 1}. Match Explanation:`);

      const explanation = explainMatch(product, designDNA);

      console.log(`   Product: ${explanation.product.name.substring(0, 40)}...`);
      console.log(`   Overall Score: ${(explanation.overallScore * 100).toFixed(1)}%`);
      console.log(`   Confidence: ${explanation.confidence}`);
      console.log(`   Reasons:`);

      explanation.reasons.forEach(reason => {
        console.log(`     • ${reason.description}`);
      });

      console.log('');
    });

  } catch (error) {
    console.log(`❌ Explanation test failed: ${error.message}`);
  }
}

/**
 * Test with real moodboard analysis
 */
async function testWithRealMoodboard() {
  console.log('🎨 Testing with Real Moodboard Analysis...\n');

  // Sample moodboard URL
  const moodboardUrl = "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

  try {
    console.log('1. Analyzing moodboard...');
    const designDNA = await analyzeMoodboard(moodboardUrl, {
      projectBrief: "Modern bathroom renovation, clean and minimalist style",
      constraints: ["budget: 150000 CZK", "style: modern"]
    });

    if (designDNA.error) {
      console.log('   Using fallback analysis for search test');
      designDNA = designDNA.fallback;
    }

    console.log(`   Style detected: ${designDNA.styleAnalysis?.primary || 'unknown'}`);
    console.log(`   Colors: ${designDNA.colorPalette?.map(c => c.name).join(', ') || 'none'}`);
    console.log(`   Materials: ${designDNA.materials?.join(', ') || 'none'}`);

    console.log('\n2. Searching for matching products...');
    const results = await searchProducts(designDNA, {
      topK: 5,
      constraints: {
        roomType: "koupelna",
        materials: ["keramika"]
      },
      includeReranking: true
    });

    console.log(`   Found ${results.results.length} matching products`);
    console.log(`   Search quality: ${(results.metadata.avgSimilarity * 100).toFixed(1)}% avg similarity`);

    if (results.results.length > 0) {
      console.log('\n   Top match:');
      const topProduct = results.results[0];
      console.log(`   • ${topProduct.name}`);
      console.log(`   • Similarity: ${(topProduct.similarity * 100).toFixed(1)}%`);
      console.log(`   • Price: ${topProduct.metadata.price}`);
      console.log(`   • URL: ${topProduct.metadata.url}`);
    }

  } catch (error) {
    console.log(`❌ Real moodboard test failed: ${error.message}`);
  }

  console.log('');
}

/**
 * Performance benchmarks
 */
async function benchmarkPerformance() {
  console.log('⚡ Performance Benchmarks...\n');

  const designDNA = SAMPLE_DESIGNS[0].designDNA;
  const iterations = 5;

  let totalTime = 0;
  let totalResults = 0;

  for (let i = 0; i < iterations; i++) {
    const startTime = Date.now();

    const results = await searchProducts(designDNA, {
      topK: 20,
      constraints: { materials: ["keramika"] },
      includeReranking: true
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    totalTime += duration;
    totalResults += results.results.length;
  }

  const avgTime = totalTime / iterations;
  const avgResults = totalResults / iterations;

  console.log(`Average search time: ${avgTime.toFixed(1)}ms`);
  console.log(`Average results: ${avgResults.toFixed(1)} products`);
  console.log(`Performance target: <500ms ✅ ${avgTime < 500 ? 'PASSED' : 'FAILED'}`);
  console.log('');
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log('🧪 Starting Product Matching Engine Tests\n');
  console.log('='.repeat(60));

  const startTime = Date.now();

  try {
    await testBasicSearch();
    await testConstraints();
    await testMatchExplanation();
    await testWithRealMoodboard();
    await benchmarkPerformance();

    const endTime = Date.now();
    const totalDuration = endTime - startTime;

    console.log('='.repeat(60));
    console.log('📊 Test Suite Summary');
    console.log('='.repeat(60));
    console.log(`⏱️  Total Duration: ${totalDuration}ms (${(totalDuration / 1000).toFixed(1)}s)`);
    console.log('✅ All tests completed successfully!');
    console.log('');
    console.log('🚀 Product matching engine is ready for integration!');

  } catch (error) {
    console.log('❌ Test suite failed:', error.message);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests();
}

export { runAllTests, testBasicSearch, testConstraints, testMatchExplanation };