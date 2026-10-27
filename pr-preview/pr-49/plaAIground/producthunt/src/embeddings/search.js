import { loadEmbeddings, createLocalEmbedding } from './generate.js';

/**
 * Product Similarity Search Engine
 *
 * Implements vector similarity search to match moodboard analysis
 * with product catalog using cosine similarity.
 */

/**
 * Calculate cosine similarity between two vectors
 * @param {number[]} vecA - First vector
 * @param {number[]} vecB - Second vector
 * @returns {number} Similarity score (0-1, higher = more similar)
 */
function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Create search query embedding from design DNA
 * @param {Object} designDNA - Moodboard analysis result
 * @returns {string} Search query text for embedding
 */
function createSearchQuery(designDNA) {
  const parts = [];

  // Style
  if (designDNA.styleAnalysis?.primary) {
    parts.push(`Style: ${designDNA.styleAnalysis.primary}`);
    if (designDNA.styleAnalysis.secondary) {
      parts.push(designDNA.styleAnalysis.secondary);
    }
  }

  // Colors
  if (designDNA.colorPalette?.length) {
    const colors = designDNA.colorPalette
      .sort((a, b) => b.prominence - a.prominence) // Sort by prominence
      .slice(0, 3) // Top 3 colors
      .map(c => c.name);
    parts.push(`Colors: ${colors.join(', ')}`);
  }

  // Materials
  if (designDNA.materials?.length) {
    parts.push(`Materials: ${designDNA.materials.join(', ')}`);
  }

  // Room context
  if (designDNA.roomContext?.type) {
    parts.push(`Room: ${designDNA.roomContext.type}`);
  }

  // Mood
  if (designDNA.mood?.atmosphere?.length) {
    parts.push(`Mood: ${designDNA.mood.atmosphere.join(', ')}`);
  }

  // Search keywords
  if (designDNA.searchKeywords?.czech?.length) {
    parts.push(`Keywords: ${designDNA.searchKeywords.czech.join(', ')}`);
  }

  return parts.join('. ');
}

/**
 * Filter products by constraints
 * @param {Array} products - Product embeddings
 * @param {Object} constraints - Search constraints
 * @returns {Array} Filtered products
 */
function applyConstraints(products, constraints = {}) {
  let filtered = [...products];

  // Price range filter
  if (constraints.minPrice || constraints.maxPrice) {
    filtered = filtered.filter(product => {
      const price = parseFloat(product.metadata.price?.replace(/[^\d]/g, '') || 0);
      if (constraints.minPrice && price < constraints.minPrice) return false;
      if (constraints.maxPrice && price > constraints.maxPrice) return false;
      return true;
    });
  }

  // Material filter
  if (constraints.materials?.length) {
    filtered = filtered.filter(product => {
      const productMaterials = product.metadata.materials || [];
      return constraints.materials.some(material =>
        productMaterials.some(pm =>
          pm.toLowerCase().includes(material.toLowerCase())
        )
      );
    });
  }

  // Style filter (from AI enrichment)
  if (constraints.styles?.length) {
    filtered = filtered.filter(product => {
      const styleTags = product.metadata.aiEnrichment?.styleTags || [];
      return constraints.styles.some(style =>
        styleTags.some(tag =>
          tag.toLowerCase().includes(style.toLowerCase())
        )
      );
    });
  }

  // Room type filter
  if (constraints.roomType) {
    filtered = filtered.filter(product => {
      const roomTypes = product.metadata.aiEnrichment?.roomTypes || [];
      return roomTypes.some(room =>
        room.toLowerCase().includes(constraints.roomType.toLowerCase())
      );
    });
  }

  return filtered;
}

/**
 * Re-rank products using LLM for better relevance
 * @param {Array} products - Top similarity matches
 * @param {Object} designDNA - Original design DNA
 * @param {number} topK - Number of products to re-rank
 * @returns {Array} Re-ranked products
 */
function rerankProducts(products, designDNA, topK = 20) {
  // For MVP, use simple heuristic re-ranking
  // In production, this would use Claude Haiku for smarter re-ranking

  return products.map(product => {
    let bonusScore = 0;

    // Bonus for exact style matches
    const styleTags = product.metadata.aiEnrichment?.styleTags || [];
    if (styleTags.includes(designDNA.styleAnalysis?.primary)) {
      bonusScore += 0.2;
    }

    // Bonus for room context match
    const roomTypes = product.metadata.aiEnrichment?.roomTypes || [];
    if (roomTypes.includes(designDNA.roomContext?.type)) {
      bonusScore += 0.1;
    }

    // Bonus for color matches
    const colorTags = product.metadata.aiEnrichment?.colorTags || [];
    const designColors = designDNA.colorPalette?.map(c => c.name) || [];
    const colorMatches = colorTags.filter(color =>
      designColors.some(dc => dc.includes(color) || color.includes(dc))
    );
    bonusScore += colorMatches.length * 0.05;

    return {
      ...product,
      finalScore: product.similarity + bonusScore,
      bonusScore,
      reasons: {
        styleMatch: styleTags.includes(designDNA.styleAnalysis?.primary),
        roomMatch: roomTypes.includes(designDNA.roomContext?.type),
        colorMatches: colorMatches.length
      }
    };
  }).sort((a, b) => b.finalScore - a.finalScore);
}

/**
 * Search for products matching design DNA
 * @param {Object} designDNA - Moodboard analysis result
 * @param {Object} options - Search options
 * @returns {Promise<Object>} Search results
 */
export async function searchProducts(designDNA, options = {}) {
  const {
    topK = 20,
    constraints = {},
    embeddingFile = null,
    includeReranking = true
  } = options;

  console.log('🔍 Starting product search...');

  try {
    // Load embeddings
    const embeddingData = loadEmbeddings(embeddingFile);
    console.log(`📊 Loaded ${embeddingData.embeddings.length} product embeddings`);

    // Create query embedding
    const searchQuery = createSearchQuery(designDNA);
    console.log(`🎯 Search query: ${searchQuery.substring(0, 100)}...`);

    const queryEmbedding = createLocalEmbedding(searchQuery);

    // Calculate similarities
    const similarities = embeddingData.embeddings.map(product => ({
      ...product,
      similarity: cosineSimilarity(queryEmbedding, product.embedding)
    }));

    // Sort by similarity
    let rankedProducts = similarities.sort((a, b) => b.similarity - a.similarity);

    // Apply constraints
    const beforeConstraints = rankedProducts.length;
    rankedProducts = applyConstraints(rankedProducts, constraints);
    const afterConstraints = rankedProducts.length;

    console.log(`🔧 Constraints filtered: ${beforeConstraints} → ${afterConstraints} products`);

    // Take top K before re-ranking
    rankedProducts = rankedProducts.slice(0, topK * 2); // Get more for re-ranking

    // Re-rank for better relevance
    if (includeReranking) {
      console.log('🎯 Re-ranking products for relevance...');
      rankedProducts = rerankProducts(rankedProducts, designDNA, topK);
    }

    // Final top K
    const finalResults = rankedProducts.slice(0, topK);

    const results = {
      query: {
        designDNA,
        searchQuery,
        constraints
      },
      results: finalResults,
      metadata: {
        totalEmbeddings: embeddingData.embeddings.length,
        beforeConstraints,
        afterConstraints,
        topK,
        searchedAt: new Date().toISOString(),
        avgSimilarity: finalResults.length > 0 ?
          finalResults.reduce((sum, p) => sum + p.similarity, 0) / finalResults.length :
          0,
        avgFinalScore: finalResults.length > 0 ?
          finalResults.reduce((sum, p) => sum + (p.finalScore || p.similarity), 0) / finalResults.length :
          0
      }
    };

    console.log(`✅ Search complete! Found ${finalResults.length} matches`);
    console.log(`📊 Avg similarity: ${results.metadata.avgSimilarity.toFixed(3)}`);

    return results;

  } catch (error) {
    console.error('❌ Product search failed:', error.message);
    throw error;
  }
}

/**
 * Explain why a product was matched
 * @param {Object} product - Product with similarity scores
 * @param {Object} designDNA - Original design DNA
 * @returns {Object} Explanation
 */
export function explainMatch(product, designDNA) {
  const reasons = [];

  // Similarity score
  reasons.push({
    type: 'similarity',
    score: product.similarity,
    description: `${(product.similarity * 100).toFixed(1)}% vector similarity to your design vision`
  });

  // Style match
  if (product.reasons?.styleMatch) {
    reasons.push({
      type: 'style',
      description: `Style matches: ${designDNA.styleAnalysis?.primary}`
    });
  }

  // Room match
  if (product.reasons?.roomMatch) {
    reasons.push({
      type: 'room',
      description: `Perfect for: ${designDNA.roomContext?.type}`
    });
  }

  // Color matches
  if (product.reasons?.colorMatches > 0) {
    reasons.push({
      type: 'color',
      description: `${product.reasons.colorMatches} color matches with your palette`
    });
  }

  // Material matches
  const productMaterials = product.metadata.materials || [];
  const designMaterials = designDNA.materials || [];
  const materialMatches = productMaterials.filter(pm =>
    designMaterials.some(dm => dm.includes(pm) || pm.includes(dm))
  );

  if (materialMatches.length > 0) {
    reasons.push({
      type: 'material',
      description: `Matching materials: ${materialMatches.join(', ')}`
    });
  }

  return {
    product: {
      name: product.name,
      price: product.metadata.price,
      url: product.metadata.url
    },
    overallScore: product.finalScore || product.similarity,
    reasons,
    confidence: product.similarity > 0.3 ? 'high' : product.similarity > 0.15 ? 'medium' : 'low'
  };
}

export { cosineSimilarity, createSearchQuery, applyConstraints, rerankProducts };