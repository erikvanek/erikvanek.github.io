#!/usr/bin/env node

import client from '../src/llm/client.js';

console.log('🧪 Testing Claude API Connection...\n');

async function testAPI() {
  try {
    // Test 1: Simple greeting with Haiku (cheaper)
    console.log('Test 1: Simple greeting with Claude Haiku');
    const result1 = await client.sendMessage({
      prompt: 'Say hello in Czech and explain what you can help me build.',
      model: 'haiku',
      maxTokens: 200,
    });

    console.log('✅ Response:', result1.text);
    console.log('💰 Cost: $' + result1.cost.toFixed(4));
    console.log('📊 Tokens:', result1.usage);
    console.log('');

    // Test 2: More complex task with Sonnet
    console.log('Test 2: Design analysis with Claude Sonnet');
    const result2 = await client.sendMessage({
      prompt: `Analyze this interior design style and extract key elements:
      
      "A minimalist Scandinavian bathroom with white subway tiles, 
      natural wood accents, chrome fixtures, and soft natural lighting."
      
      Return as JSON with: style, colors, materials, mood`,
      model: 'sonnet',
      maxTokens: 300,
    });

    console.log('✅ Response:', result2.text);
    console.log('💰 Cost: $' + result2.cost.toFixed(4));
    console.log('📊 Tokens:', result2.usage);
    console.log('');

    // Show total costs
    const totalCosts = client.getTotalCosts();
    console.log('📈 Session Summary:');
    console.log('   Total API calls:', totalCosts.calls);
    console.log('   Total cost: $' + totalCosts.total.toFixed(4));
    console.log('   Input tokens:', totalCosts.tokens.input);
    console.log('   Output tokens:', totalCosts.tokens.output);
    console.log('');

    console.log('✅ All tests passed! Claude API is working.');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

testAPI();
