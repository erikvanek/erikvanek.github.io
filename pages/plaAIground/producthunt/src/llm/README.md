# LLM Integration Module

This module handles all interactions with the Claude API, including cost tracking and convenience methods.

## Setup

1. Add your API key to `.env`:
```bash
ANTHROPIC_API_KEY=your_key_here
```

2. Import the client:
```javascript
import client from './src/llm/client.js';
```

## Usage Examples

### Simple Message

```javascript
const result = await client.sendMessage({
  prompt: 'What is minimalist design?',
  model: 'haiku',  // or 'sonnet'
  maxTokens: 500
});

console.log(result.text);
console.log('Cost: $' + result.cost);
```

### With System Prompt

```javascript
const result = await client.sendMessage({
  prompt: 'Analyze this moodboard...',
  system: 'You are an interior design expert specializing in Czech market products.',
  model: 'sonnet',
  maxTokens: 1000
});
```

### With Prompt Caching (saves costs on repeated system prompts)

```javascript
const systemPrompt = 'You are an expert...'; // Long system prompt

const result = await client.sendMessage({
  prompt: 'First query',
  system: systemPrompt,
  cache: true,  // Cache the system prompt
  model: 'sonnet'
});

// Subsequent calls will use cached system prompt (90% cheaper!)
const result2 = await client.sendMessage({
  prompt: 'Second query',
  system: systemPrompt,
  cache: true,
  model: 'sonnet'
});
```

## Cost Tracking

```javascript
// Get session costs
const costs = client.getTotalCosts();
console.log('Total spent: $' + costs.total);
console.log('API calls made:', costs.calls);
console.log('Tokens used:', costs.tokens);

// Reset tracking
client.resetCosts();
```

## Model Selection

- **Haiku (`haiku`)**: Fast and cheap. Use for:
  - Simple extractions
  - Basic tagging
  - Quick responses
  - Development/testing
  
- **Sonnet (`sonnet`)**: Smart and balanced. Use for:
  - Moodboard analysis
  - Conversational refinement
  - Complex reasoning
  - Production quality

## Pricing (per million tokens)

| Model | Input | Output | Cached Input |
|-------|-------|--------|--------------|
| Sonnet 4 | $3.00 | $15.00 | $0.30 |
| Haiku 4 | $0.25 | $1.25 | $0.025 |

## Testing

Run the test suite:
```bash
npm run test:api
```

Should output:
- ✅ Connection test
- ✅ Haiku response
- ✅ Sonnet response
- 📊 Cost breakdown

## Best Practices

1. **Use Haiku for development** - Much cheaper while iterating
2. **Use prompt caching** - Saves 90% on repeated system prompts
3. **Set maxTokens appropriately** - Don't pay for tokens you don't need
4. **Track costs** - Monitor spending during development
5. **Handle errors** - API calls can fail, always use try/catch

## Example: Moodboard Analysis

```javascript
const analyzeMoodboard = async (imageDescription) => {
  const systemPrompt = `You are an interior design expert. 
  Analyze design styles and extract structured information.
  Always return valid JSON.`;

  const result = await client.sendMessage({
    prompt: `Analyze this design: "${imageDescription}"
    
    Return JSON with:
    {
      "style": ["minimalist", "scandinavian"],
      "colors": ["white", "natural wood", "black"],
      "materials": ["wood", "metal", "ceramic"],
      "mood": ["calm", "clean", "modern"]
    }`,
    system: systemPrompt,
    model: 'sonnet',
    maxTokens: 500,
    cache: true
  });

  return JSON.parse(result.text);
};
```

## Troubleshooting

### "ANTHROPIC_API_KEY not set"
- Check `.env` file exists
- Verify key is correct
- Make sure dotenv is installed

### "Rate limit exceeded"
- Add delays between requests
- Upgrade API tier if needed
- Use caching to reduce calls

### "Invalid model name"
- Use 'haiku' or 'sonnet'
- Or full model IDs: 'claude-sonnet-4-20250514'

## Next Steps

1. ✅ Test API connection
2. Create moodboard analysis prompt
3. Test with real design images
4. Implement product enrichment
5. Add embedding generation
