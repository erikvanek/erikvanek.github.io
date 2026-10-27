import client from './client.js';

/**
 * Moodboard Analysis for Interior Design Product Discovery
 *
 * This module analyzes uploaded moodboard images to extract design DNA
 * that can be used to match products from Czech e-shops.
 */

/**
 * System prompt for moodboard analysis
 * Optimized for Czech interior design market and product matching
 */
const MOODBOARD_SYSTEM_PROMPT = `You are an expert interior design consultant specializing in the Czech market.

Your task is to analyze moodboard images and extract specific design elements that can be used to search for products in Czech e-commerce stores (Siko, Baumax, Hornbach, XXXLutz, Sconto).

For each moodboard, analyze and extract:

1. **STYLE CATEGORIES** (choose primary + secondary):
   - Minimalist/Minimalistický
   - Scandinavian/Skandinávský
   - Industrial/Industriální
   - Modern/Moderní
   - Classic/Klasický
   - Rustic/Rustikální
   - Contemporary/Současný
   - Art Deco
   - Bohemian/Boho

2. **COLOR PALETTE** (3-5 dominant colors):
   - Use Czech color names: bílá, černá, šedá, béžová, hnědá, dřevo, zlatá, stříbrná
   - Include hex codes for precise matching
   - Note warm/cool temperature

3. **MATERIALS** (identify all visible):
   - Wood types: dřevo (dub, buk, borovice, ořech)
   - Metals: kov (nerez, mosaz, černý kov, chrom)
   - Stones: kámen (mramor, žula, travertin)
   - Ceramics: keramika, porcelán
   - Textiles: textil, látka, kůže
   - Glass: sklo, zrcadlo

4. **ROOM CONTEXT**:
   - Bathroom/Koupelna, Kitchen/Kuchyně, Living Room/Obývák, Bedroom/Ložnice
   - Approximate space size: small/malý, medium/střední, large/velký

5. **MOOD & ATMOSPHERE**:
   - Warm/Teplý, Cool/Chladný, Cozy/Útulný, Elegant/Elegantní
   - Bright/Světlý, Dark/Tmavý, Airy/Vzdušný, Intimate/Intimní

6. **KEY DESIGN ELEMENTS**:
   - Lighting style: pendant/závěsné, recessed/zapuštěné, ambient/ambientní
   - Textures: smooth/hladký, rough/drsný, matte/matný, glossy/lesklý
   - Patterns: geometric/geometrický, organic/organický, none/žádný

7. **PRODUCT CATEGORIES** (what products would fit):
   - Sanitary ceramics/Sanitární keramika
   - Tiles/Obklady a dlažby
   - Lighting/Osvětlení
   - Furniture/Nábytek
   - Fixtures/Armatura

OUTPUT FORMAT: Return ONLY valid JSON with Czech translations included:

{
  "styleAnalysis": {
    "primary": "minimalistický",
    "secondary": "skandinávský",
    "confidence": 0.85
  },
  "colorPalette": [
    {"name": "bílá", "hex": "#FFFFFF", "prominence": 0.4},
    {"name": "šedá", "hex": "#888888", "prominence": 0.3},
    {"name": "dřevo", "hex": "#8B4513", "prominence": 0.3}
  ],
  "materials": ["dřevo", "keramika", "kov"],
  "roomContext": {
    "type": "koupelna",
    "size": "střední"
  },
  "mood": {
    "temperature": "neutrální",
    "atmosphere": ["útulný", "elegantní"],
    "brightness": "světlý"
  },
  "keyElements": {
    "lighting": "zapuštěné",
    "textures": ["hladký", "matný"],
    "patterns": "žádný"
  },
  "productCategories": [
    "sanitární keramika",
    "obklady a dlažby",
    "osvětlení"
  ],
  "searchKeywords": {
    "czech": ["minimalistický", "bílý", "keramika", "moderní"],
    "english": ["minimalist", "white", "ceramic", "modern"]
  }
}`;

/**
 * Analyze a moodboard image and extract design DNA
 * @param {string} imageData - Base64 encoded image or image URL
 * @param {Object} options - Analysis options
 * @param {string} [options.projectBrief] - Additional context from user
 * @param {string[]} [options.constraints] - Budget, size, style constraints
 * @returns {Promise<Object>} Design DNA object
 */
export async function analyzeMoodboard(imageData, options = {}) {
  const { projectBrief, constraints = [] } = options;

  try {
    // Prepare user prompt with context
    let userPrompt = "Please analyze this interior design moodboard image.";

    if (projectBrief) {
      userPrompt += `\n\nProject context: ${projectBrief}`;
    }

    if (constraints.length > 0) {
      userPrompt += `\n\nConstraints to consider: ${constraints.join(', ')}`;
    }

    userPrompt += "\n\nReturn your analysis as JSON following the specified format.";

    // Prepare content array for vision
    const content = [
      {
        type: "text",
        text: userPrompt
      }
    ];

    if (imageData.startsWith('http')) {
      // URL image
      content.push({
        type: "image",
        source: {
          type: "url",
          url: imageData
        }
      });
    } else {
      // Base64 image
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: "image/jpeg",
          data: imageData
        }
      });
    }

    const response = await client.sendMessage({
      prompt: content,
      system: MOODBOARD_SYSTEM_PROMPT,
      model: 'sonnet', // Use Sonnet for vision tasks
      maxTokens: 2048,
      cache: true // Cache the system prompt
    });

    // Parse the JSON response (handle markdown code blocks)
    let jsonText = response.text;

    // Remove markdown code blocks if present
    if (jsonText.includes('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/\n?```/g, '');
    } else if (jsonText.includes('```')) {
      jsonText = jsonText.replace(/```\n?/g, '').replace(/\n?```/g, '');
    }

    const designDNA = JSON.parse(jsonText.trim());

    // Add analysis metadata
    designDNA.meta = {
      extractedAt: new Date().toISOString(),
      cost: response.cost,
      model: response.model,
      confidence: designDNA.styleAnalysis?.confidence || 0.8
    };

    console.log(`Moodboard analyzed - Cost: $${response.cost.toFixed(4)}`);

    return designDNA;

  } catch (error) {
    console.error('Moodboard analysis failed:', error.message);

    // Return fallback analysis for development
    return {
      error: error.message,
      fallback: {
        styleAnalysis: { primary: "moderní", secondary: "minimalistický", confidence: 0.5 },
        colorPalette: [
          { name: "bílá", hex: "#FFFFFF", prominence: 0.4 },
          { name: "šedá", hex: "#888888", prominence: 0.6 }
        ],
        materials: ["keramika", "kov"],
        roomContext: { type: "neurčeno", size: "střední" },
        mood: { temperature: "neutrální", atmosphere: ["moderní"], brightness: "světlý" },
        keyElements: { lighting: "standardní", textures: ["hladký"], patterns: "žádný" },
        productCategories: ["sanitární keramika"],
        searchKeywords: { czech: ["moderní", "bílý"], english: ["modern", "white"] },
        meta: { extractedAt: new Date().toISOString(), cost: 0, model: "fallback" }
      }
    };
  }
}

/**
 * Refine search based on conversational feedback
 * @param {Object} originalDesignDNA - Original moodboard analysis
 * @param {string} userFeedback - User refinement like "warmer colors", "more minimalist"
 * @returns {Promise<Object>} Updated design DNA
 */
export async function refineMoodboard(originalDesignDNA, userFeedback) {
  try {
    const refinementPrompt = `Based on this original design analysis and user feedback, provide an updated JSON analysis.

Original Analysis:
${JSON.stringify(originalDesignDNA, null, 2)}

User Feedback: "${userFeedback}"

Interpret the feedback and adjust the design DNA accordingly:
- "warmer" → increase warm colors, add wood tones
- "cooler" → increase cool colors, add metals
- "more minimalist" → reduce elements, focus on clean lines
- "more rustic" → add natural materials, warmer tones
- "darker" → shift color palette to darker tones
- "brighter" → shift to lighter, more vibrant colors

Return the updated JSON in the same format.`;

    const response = await client.sendMessage({
      prompt: refinementPrompt,
      system: "You are a design consultant helping refine product search criteria. Return only valid JSON.",
      model: 'haiku', // Use cheaper model for refinement
      maxTokens: 1500,
      cache: false
    });

    // Parse the JSON response (handle markdown code blocks)
    let jsonText = response.text;

    // Remove markdown code blocks if present
    if (jsonText.includes('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/\n?```/g, '');
    } else if (jsonText.includes('```')) {
      jsonText = jsonText.replace(/```\n?/g, '').replace(/\n?```/g, '');
    }

    const refinedDNA = JSON.parse(jsonText.trim());

    // Add refinement metadata
    refinedDNA.meta = {
      ...originalDesignDNA.meta,
      refinedAt: new Date().toISOString(),
      refinementCost: response.cost,
      userFeedback
    };

    console.log(`Moodboard refined - Cost: $${response.cost.toFixed(4)}`);

    return refinedDNA;

  } catch (error) {
    console.error('Moodboard refinement failed:', error.message);
    return originalDesignDNA; // Return original if refinement fails
  }
}

/**
 * Generate product enrichment tags from product data
 * Uses cheaper Haiku model to extract style tags from product descriptions
 * @param {Object} product - Product data from crawler
 * @returns {Promise<Object>} Enriched product with style tags
 */
export async function enrichProduct(product) {
  try {
    const enrichmentPrompt = `Analyze this Czech product and extract style tags for interior design matching.

Product: ${product.name}
Description: ${product.details?.description || 'N/A'}
Materials: ${product.details?.materials?.join(', ') || 'N/A'}
Specifications: ${JSON.stringify(product.details?.specifications || {})}

Extract:
1. Style categories that match this product
2. Key design attributes
3. Room suitability
4. Color/material tags

Return JSON:
{
  "styleTags": ["minimalistický", "moderní"],
  "attributes": ["hladký", "matný", "elegantní"],
  "roomTypes": ["koupelna", "kuchyně"],
  "colorTags": ["bílá", "stříbrná"],
  "materialTags": ["keramika", "kov"]
}`;

    const response = await client.sendMessage({
      prompt: enrichmentPrompt,
      system: "You are a product categorization expert. Return only valid JSON.",
      model: 'haiku', // Cheaper model for batch processing
      maxTokens: 512,
      cache: false
    });

    // Parse the JSON response (handle markdown code blocks)
    let jsonText = response.text;

    // Remove markdown code blocks if present
    if (jsonText.includes('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/\n?```/g, '');
    } else if (jsonText.includes('```')) {
      jsonText = jsonText.replace(/```\n?/g, '').replace(/\n?```/g, '');
    }

    const enrichment = JSON.parse(jsonText.trim());

    // Add to product
    return {
      ...product,
      aiEnrichment: {
        ...enrichment,
        enrichedAt: new Date().toISOString(),
        cost: response.cost
      }
    };

  } catch (error) {
    console.error(`Product enrichment failed for ${product.name}:`, error.message);
    return product; // Return original product if enrichment fails
  }
}

export { MOODBOARD_SYSTEM_PROMPT };