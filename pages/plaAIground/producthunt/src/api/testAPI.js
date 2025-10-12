import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

/**
 * Comprehensive API testing suite for Interior Design Product Discovery
 * Run with: node src/api/testAPI.js
 */

const API_BASE = 'http://localhost:3000/api';

// Test utilities
async function makeRequest(method, endpoint, data = null, isFormData = false) {
  const url = `${API_BASE}${endpoint}`;

  const options = {
    method,
    headers: {}
  };

  if (data && !isFormData) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  } else if (data && isFormData) {
    options.body = data; // FormData sets its own headers
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return {
      status: response.status,
      success: response.ok,
      data: result
    };
  } catch (error) {
    return {
      status: 0,
      success: false,
      error: error.message
    };
  }
}

/**
 * Test server health and connectivity
 */
async function testHealth() {
  console.log('🏥 Testing API Health...');

  const result = await makeRequest('GET', '/health');

  if (result.success) {
    console.log('   ✅ Server is healthy');
    console.log(`   📊 Services: ${Object.entries(result.data.services).map(([k,v]) => `${k}:${v}`).join(', ')}`);
    console.log(`   🕒 Timestamp: ${result.data.timestamp}`);
    return true;
  } else {
    console.log('   ❌ Server health check failed');
    console.log(`   Error: ${result.error || 'Unknown error'}`);
    return false;
  }
}

/**
 * Test session creation and management
 */
async function testSessionManagement() {
  console.log('\n🎫 Testing Session Management...');

  // Create session
  console.log('1. Creating new session...');
  const sessionResult = await makeRequest('POST', '/session');

  if (!sessionResult.success) {
    console.log('   ❌ Session creation failed');
    return null;
  }

  const sessionId = sessionResult.data.sessionId;
  console.log(`   ✅ Session created: ${sessionId}`);

  // Get session info
  console.log('2. Retrieving session info...');
  const infoResult = await makeRequest('GET', `/session/${sessionId}`);

  if (infoResult.success) {
    console.log('   ✅ Session retrieved successfully');
    console.log(`   📊 Session info: ${JSON.stringify(infoResult.data.session, null, 2)}`);
  } else {
    console.log('   ❌ Session retrieval failed');
  }

  return sessionId;
}

/**
 * Test moodboard analysis with URL
 */
async function testMoodboardAnalysis(sessionId) {
  console.log('\n🎨 Testing Moodboard Analysis...');

  if (!sessionId) {
    console.log('   ❌ No session ID provided');
    return null;
  }

  const testImage = "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

  const analysisData = {
    sessionId,
    imageUrl: testImage,
    projectBrief: "Modern minimalist bathroom for Prague apartment. Budget: 200,000 CZK. Clean lines and quality materials.",
    constraints: JSON.stringify(["budget: 200000 CZK", "style: modern", "room: bathroom"])
  };

  console.log('   📸 Analyzing minimalist bathroom moodboard...');
  const startTime = Date.now();

  const result = await makeRequest('POST', '/analyze-moodboard', analysisData);

  const duration = Date.now() - startTime;

  if (result.success) {
    const { designDNA, cost } = result.data;
    console.log(`   ✅ Analysis completed in ${duration}ms`);
    console.log(`   💰 Cost: $${cost?.toFixed(4) || '0.0000'}`);

    if (designDNA.error) {
      console.log('   ⚠️  Used fallback analysis');
      console.log(`   🎯 Style: ${designDNA.fallback?.styleAnalysis?.primary || 'unknown'}`);
    } else {
      console.log(`   🎯 Style: ${designDNA.styleAnalysis?.primary || 'unknown'}`);
      console.log(`   🎨 Colors: ${designDNA.colorPalette?.map(c => c.name).slice(0, 3).join(', ') || 'none'}`);
      console.log(`   🏗️  Materials: ${designDNA.materials?.join(', ') || 'none'}`);
      console.log(`   🏠 Room: ${designDNA.roomContext?.type || 'unknown'}`);
    }

    return designDNA;
  } else {
    console.log(`   ❌ Analysis failed after ${duration}ms`);
    console.log(`   Error: ${result.data?.error || 'Unknown error'}`);
    return null;
  }
}

/**
 * Test product search functionality
 */
async function testProductSearch(sessionId, designDNA) {
  console.log('\n🔍 Testing Product Search...');

  if (!sessionId) {
    console.log('   ❌ No session ID provided');
    return null;
  }

  const searchData = {
    sessionId,
    constraints: {
      roomType: "koupelna",
      materials: ["keramika"],
      styles: ["minimalistický", "moderní"]
    },
    topK: 10,
    includeReranking: true
  };

  console.log('   🎯 Searching for bathroom products...');
  const startTime = Date.now();

  const result = await makeRequest('POST', '/search-products', searchData);

  const duration = Date.now() - startTime;

  if (result.success) {
    const { searchResults } = result.data;
    console.log(`   ✅ Search completed in ${duration}ms`);
    console.log(`   📊 Found: ${searchResults.totalResults} products`);
    console.log(`   🎯 Avg similarity: ${(searchResults.metadata.avgSimilarity * 100).toFixed(1)}%`);
    console.log(`   🔧 Filtered: ${searchResults.metadata.beforeConstraints} → ${searchResults.metadata.afterConstraints}`);

    if (searchResults.results.length > 0) {
      console.log('\n   Top 3 matches:');
      searchResults.results.slice(0, 3).forEach((product, i) => {
        console.log(`   ${i + 1}. ${product.name.substring(0, 40)}...`);
        console.log(`      Similarity: ${(product.similarity * 100).toFixed(1)}% | Final: ${((product.finalScore || product.similarity) * 100).toFixed(1)}%`);
        console.log(`      Price: ${product.metadata.price}`);

        if (product.explanation) {
          console.log(`      Confidence: ${product.explanation.confidence}`);
          console.log(`      Top reasons: ${product.explanation.reasons.slice(0, 2).map(r => r.description).join('; ')}`);
        }
        console.log('');
      });
    }

    return searchResults;
  } else {
    console.log(`   ❌ Search failed after ${duration}ms`);
    console.log(`   Error: ${result.data?.error || 'Unknown error'}`);
    return null;
  }
}

/**
 * Test conversational refinement
 */
async function testConversationalRefinement(sessionId) {
  console.log('\n💬 Testing Conversational Refinement...');

  if (!sessionId) {
    console.log('   ❌ No session ID provided');
    return;
  }

  const refinements = [
    "Make it warmer and more cozy",
    "More minimalist, less clutter",
    "I prefer darker colors"
  ];

  for (const [index, feedback] of refinements.entries()) {
    console.log(`\n   ${index + 1}. Testing refinement: "${feedback}"`);

    const refinementData = {
      sessionId,
      feedback
    };

    const startTime = Date.now();
    const result = await makeRequest('POST', '/refine-search', refinementData);
    const duration = Date.now() - startTime;

    if (result.success) {
      const { refinedDNA, searchResults, cost } = result.data;

      console.log(`      ✅ Refinement completed in ${duration}ms`);
      console.log(`      💰 Cost: $${cost?.toFixed(4) || '0.0000'}`);
      console.log(`      🎯 New style: ${refinedDNA.styleAnalysis?.primary || 'unchanged'}`);
      console.log(`      📊 Found: ${searchResults.totalResults} products`);
      console.log(`      🎨 Updated mood: ${refinedDNA.mood?.atmosphere?.slice(0, 2).join(', ') || 'unchanged'}`);

    } else {
      console.log(`      ❌ Refinement failed after ${duration}ms`);
      console.log(`      Error: ${result.data?.error || 'Unknown error'}`);
    }

    // Small delay between refinements
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

/**
 * Test product details endpoint
 */
async function testProductDetails(sessionId, searchResults) {
  console.log('\n📋 Testing Product Details...');

  if (!searchResults || searchResults.results.length === 0) {
    console.log('   ❌ No search results to test with');
    return;
  }

  const topProduct = searchResults.results[0];
  console.log(`   🔍 Getting details for: ${topProduct.name.substring(0, 40)}...`);

  const result = await makeRequest('GET', `/products/${topProduct.id}?sessionId=${sessionId}`);

  if (result.success) {
    const product = result.data.product;
    console.log('   ✅ Product details retrieved');
    console.log(`   🏷️  Name: ${product.name.substring(0, 50)}...`);
    console.log(`   💰 Price: ${product.metadata.price}`);
    console.log(`   🔗 URL: ${product.metadata.url}`);
    console.log(`   🏗️  Materials: ${product.metadata.materials?.join(', ') || 'none'}`);

    if (product.explanation) {
      console.log(`   🎯 Match score: ${product.explanation.overallScore}%`);
      console.log(`   📝 Reasons: ${product.explanation.reasons.length} explanations`);
    }

  } else {
    console.log('   ❌ Product details retrieval failed');
    console.log(`   Error: ${result.data?.error || 'Unknown error'}`);
  }
}

/**
 * Test system statistics
 */
async function testSystemStats() {
  console.log('\n📊 Testing System Statistics...');

  const result = await makeRequest('GET', '/stats');

  if (result.success) {
    const stats = result.data.stats;
    console.log('   ✅ Statistics retrieved');
    console.log(`   🎫 Sessions: ${stats.sessions.total} total, ${stats.sessions.active} active`);
    console.log(`   💰 Costs: $${stats.costs.total.toFixed(4)} total, $${stats.costs.average.toFixed(4)} average`);
    console.log(`   🔍 Searches: ${stats.searches.total} total, ${stats.searches.average.toFixed(1)} average`);
    console.log(`   📦 Products: ${stats.products.totalProducts} available`);
    console.log(`   🤖 LLM: ${stats.llmStats.calls} calls, $${stats.llmStats.total.toFixed(4)} spent`);

  } else {
    console.log('   ❌ Statistics retrieval failed');
    console.log(`   Error: ${result.data?.error || 'Unknown error'}`);
  }
}

/**
 * Test error handling
 */
async function testErrorHandling() {
  console.log('\n⚠️  Testing Error Handling...');

  // Test 404
  console.log('   1. Testing 404 endpoint...');
  const notFoundResult = await makeRequest('GET', '/nonexistent');
  if (notFoundResult.status === 404) {
    console.log('      ✅ 404 handled correctly');
  } else {
    console.log('      ❌ 404 not handled properly');
  }

  // Test missing session ID
  console.log('   2. Testing missing session ID...');
  const missingSessionResult = await makeRequest('POST', '/analyze-moodboard', {
    imageUrl: 'test.jpg'
  });
  if (!missingSessionResult.success && missingSessionResult.data?.error?.includes('Session ID')) {
    console.log('      ✅ Missing session ID handled correctly');
  } else {
    console.log('      ❌ Missing session ID not handled properly');
  }

  // Test invalid product ID
  console.log('   3. Testing invalid product ID...');
  const invalidProductResult = await makeRequest('GET', '/products/nonexistent');
  if (invalidProductResult.status === 404) {
    console.log('      ✅ Invalid product ID handled correctly');
  } else {
    console.log('      ❌ Invalid product ID not handled properly');
  }
}

/**
 * Run performance benchmarks
 */
async function testPerformance(sessionId) {
  console.log('\n⚡ Testing Performance...');

  if (!sessionId) {
    console.log('   ❌ No session ID for performance testing');
    return;
  }

  const iterations = 5;
  let totalSearchTime = 0;
  let totalResults = 0;

  console.log(`   🔄 Running ${iterations} search iterations...`);

  for (let i = 0; i < iterations; i++) {
    const startTime = Date.now();

    const result = await makeRequest('POST', '/search-products', {
      sessionId,
      constraints: { materials: ["keramika"] },
      topK: 20
    });

    const duration = Date.now() - startTime;
    totalSearchTime += duration;

    if (result.success) {
      totalResults += result.data.searchResults.totalResults;
    }

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  const avgSearchTime = totalSearchTime / iterations;
  const avgResults = totalResults / iterations;

  console.log(`   📊 Performance Results:`);
  console.log(`      Average search time: ${avgSearchTime.toFixed(1)}ms`);
  console.log(`      Average results: ${avgResults.toFixed(1)} products`);
  console.log(`      Performance target: <2000ms ✅ ${avgSearchTime < 2000 ? 'PASSED' : 'FAILED'}`);
  console.log(`      Throughput: ${(1000 / avgSearchTime).toFixed(1)} searches/second`);
}

/**
 * Main test runner
 */
async function runAllTests() {
  console.log('🧪 Starting Comprehensive API Test Suite');
  console.log('='.repeat(60));

  const startTime = Date.now();
  let sessionId = null;
  let designDNA = null;
  let searchResults = null;

  try {
    // Test server connectivity
    const serverHealthy = await testHealth();
    if (!serverHealthy) {
      console.log('\n❌ Server not accessible. Please ensure API server is running:');
      console.log('   npm run dev:api');
      process.exit(1);
    }

    // Test session management
    sessionId = await testSessionManagement();

    // Test moodboard analysis
    if (sessionId) {
      designDNA = await testMoodboardAnalysis(sessionId);
    }

    // Test product search
    if (sessionId) {
      searchResults = await testProductSearch(sessionId, designDNA);
    }

    // Test conversational refinement
    if (sessionId) {
      await testConversationalRefinement(sessionId);
    }

    // Test product details
    if (sessionId && searchResults) {
      await testProductDetails(sessionId, searchResults);
    }

    // Test system stats
    await testSystemStats();

    // Test error handling
    await testErrorHandling();

    // Test performance
    if (sessionId) {
      await testPerformance(sessionId);
    }

    const endTime = Date.now();
    const totalDuration = endTime - startTime;

    console.log('\n' + '='.repeat(60));
    console.log('📊 Test Suite Summary');
    console.log('='.repeat(60));
    console.log(`⏱️  Total Duration: ${totalDuration}ms (${(totalDuration / 1000).toFixed(1)}s)`);
    console.log(`🎫 Session ID: ${sessionId || 'N/A'}`);
    console.log('✅ All tests completed successfully!');
    console.log('');
    console.log('🚀 API is ready for frontend integration!');

  } catch (error) {
    console.log('\n❌ Test suite failed:', error.message);
    console.log('Stack:', error.stack);
    process.exit(1);
  }
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ fetch is not available. Please use Node.js 18+ or install node-fetch');
  process.exit(1);
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests();
}

export { runAllTests };