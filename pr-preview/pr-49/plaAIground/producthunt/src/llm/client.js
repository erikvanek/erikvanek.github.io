import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Claude API Client with cost tracking and convenience methods
 */
class ClaudeClient {
  constructor() {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not set in .env file');
    }

    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Track costs
    this.totalCosts = {
      inputTokens: 0,
      outputTokens: 0,
      cachedTokens: 0,
      totalCalls: 0,
      totalSpent: 0,
    };

    // Pricing per million tokens (as of Oct 2025)
    this.pricing = {
      'claude-sonnet-4-20250514': {
        input: 3.0,
        output: 15.0,
        cached: 0.3,
      },
      'claude-sonnet-3-5-20241022': {
        input: 3.0,
        output: 15.0,
        cached: 0.3,
      },
      'claude-3-5-haiku-20241022': {
        input: 1.0,
        output: 5.0,
        cached: 0.1,
      },
    };
  }

  /**
   * Send a message to Claude
   * @param {Object} options
   * @param {string} options.prompt - User message
   * @param {string} [options.system] - System prompt
   * @param {string} [options.model] - 'sonnet' or 'haiku'
   * @param {number} [options.maxTokens] - Max output tokens
   * @param {boolean} [options.cache] - Use prompt caching
   * @returns {Promise<{text: string, cost: number, usage: Object}>}
   */
  async sendMessage({
    prompt,
    system = null,
    model = 'sonnet',
    maxTokens = 1024,
    cache = false,
  }) {
    // Map friendly names to model IDs
    const modelMap = {
      sonnet: 'claude-sonnet-4-20250514',
      haiku: 'claude-3-5-haiku-20241022',
      'sonnet-3.5': 'claude-sonnet-3-5-20241022',
    };

    const modelId = modelMap[model] || model;

    const params = {
      model: modelId,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    };

    if (system) {
      params.system = cache
        ? [
            {
              type: 'text',
              text: system,
              cache_control: { type: 'ephemeral' },
            },
          ]
        : system;
    }

    try {
      const response = await this.client.messages.create(params);

      // Calculate cost
      const usage = response.usage;
      const pricing = this.pricing[modelId];

      const inputCost = (usage.input_tokens / 1_000_000) * pricing.input;
      const outputCost = (usage.output_tokens / 1_000_000) * pricing.output;
      const cachedCost = usage.cache_read_input_tokens
        ? (usage.cache_read_input_tokens / 1_000_000) * pricing.cached
        : 0;

      const totalCost = inputCost + outputCost + cachedCost;

      // Update tracking
      this.totalCosts.inputTokens += usage.input_tokens;
      this.totalCosts.outputTokens += usage.output_tokens;
      this.totalCosts.cachedTokens += usage.cache_read_input_tokens || 0;
      this.totalCosts.totalCalls += 1;
      this.totalCosts.totalSpent += totalCost;

      return {
        text: response.content[0].text,
        cost: totalCost,
        usage: {
          input: usage.input_tokens,
          output: usage.output_tokens,
          cached: usage.cache_read_input_tokens || 0,
        },
        model: modelId,
      };
    } catch (error) {
      console.error('Claude API Error:', error.message);
      throw error;
    }
  }

  /**
   * Get total costs for this session
   */
  getTotalCosts() {
    return {
      total: this.totalCosts.totalSpent,
      tokens: {
        input: this.totalCosts.inputTokens,
        output: this.totalCosts.outputTokens,
        cached: this.totalCosts.cachedTokens,
      },
      calls: this.totalCosts.totalCalls,
    };
  }

  /**
   * Reset cost tracking
   */
  resetCosts() {
    this.totalCosts = {
      inputTokens: 0,
      outputTokens: 0,
      cachedTokens: 0,
      totalCalls: 0,
      totalSpent: 0,
    };
  }
}

// Export singleton instance
const client = new ClaudeClient();
export default client;
