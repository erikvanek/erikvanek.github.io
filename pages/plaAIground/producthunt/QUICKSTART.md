# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
cd /Users/erik/dev/erikvanek.github.io/pages/plaAIground/producthunt
npm install
```

### 2. Set Up Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env and add your Anthropic API key
# Get one at: https://console.anthropic.com/
nano .env
```

### 3. Test Basic Setup
```bash
# Test crawler (currently just a skeleton)
npm run crawl:siko

# Should output:
# 🚀 Starting Siko.cz crawler...
# ⚠️  Crawler logic not yet implemented!
```

### 4. Check Project Status
```bash
# View current phase
cat PROJECT_PLAN.md | grep "Current Status" -A 5
```

---

## 📖 What to Read First

**If you're Claude (an AI agent):**
1. Read `CLAUDE_CONTEXT.md` - Full project context
2. Check `PROJECT_PLAN.md` - Current phase & next tasks
3. Look at relevant `/src/**/README.md` files

**If you're a human:**
1. Read `README.md` - Project overview
2. Check `PROJECT_PLAN.md` - Implementation roadmap
3. Dive into code in `/src`

---

## 🎯 Current Phase: Phase 1 - Data Collection

**Next immediate steps:**

### A. Complete Siko.cz Crawler (Priority #1)
```bash
# Edit this file:
src/crawler/siko.js

# What to implement:
# 1. Navigate to bathroom fixtures category
# 2. Extract product listing (name, price, image, URL)
# 3. Visit each product page
# 4. Extract detailed info (dimensions, materials, description)
# 5. Save to JSON file
```

**Helpful commands:**
```bash
# Run crawler
npm run crawl:siko

# Check output
cat data/products/siko_*.json | head -50
```

### B. Test Claude API Integration
```bash
# Edit this file to test:
src/llm/client.js

# Create a test script:
node -e "
import client from './src/llm/client.js';
const result = await client.sendMessage({
  prompt: 'Say hello in Czech',
  model: 'haiku'
});
console.log(result.text);
console.log('Cost:', result.cost);
"
```

### C. Define Product Schema
```bash
# Create schema validation:
src/crawler/schema.js

# Should validate:
# - Required fields
# - Data types
# - Format constraints
```

---

## 🔧 Common Tasks

### Add a New E-Shop Crawler
```bash
# 1. Copy template
cp src/crawler/siko.js src/crawler/YOUR_SHOP.js

# 2. Update config
# - baseUrl
# - category paths
# - selectors

# 3. Test
npm run crawl:YOUR_SHOP
```

### Test LLM Prompt
```javascript
import client from './src/llm/client.js';

const response = await client.sendMessage({
  prompt: 'Your test prompt here',
  system: 'You are a helpful assistant',
  model: 'haiku', // or 'sonnet'
  maxTokens: 500
});

console.log(response.text);
console.log('Cost: $' + response.cost.toFixed(4));
```

### Check API Costs
```javascript
import client from './src/llm/client.js';
const costs = await client.getTotalCosts();
console.log('Total spent: $' + costs.total);
console.log('API calls: ' + costs.calls);
```

---

## 🐛 Troubleshooting

### "ANTHROPIC_API_KEY not set"
```bash
# Make sure .env file exists
ls -la .env

# Check it contains your key
cat .env | grep ANTHROPIC

# If not, add it:
echo "ANTHROPIC_API_KEY=your_key_here" >> .env
```

### "Module not found"
```bash
# Install dependencies
npm install

# Check package.json has correct type
cat package.json | grep '"type"'
# Should show: "type": "module"
```

### Crawler not working
```bash
# Install Playwright browsers
npx playwright install chromium

# Test with visible browser
# (change headless: false in siko.js)
```

---

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| `CLAUDE_CONTEXT.md` | Full context for AI agents |
| `PROJECT_PLAN.md` | Detailed roadmap & phases |
| `README.md` | Human-readable overview |
| `package.json` | Dependencies & scripts |
| `.env` | Secrets & config (don't commit!) |
| `src/crawler/siko.js` | First crawler to implement |
| `src/llm/client.js` | Claude API wrapper |

---

## 🎓 Learning Resources

- [Playwright Docs](https://playwright.dev/docs/intro)
- [Anthropic API Docs](https://docs.anthropic.com/)
- [Claude Prompt Engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering)

---

## 💬 Questions?

Check these files for answers:
1. Technical details → `src/**/README.md`
2. Project goals → `CLAUDE_CONTEXT.md`
3. Next steps → `PROJECT_PLAN.md`
4. Setup issues → This file!

---

Happy coding! 🚀
