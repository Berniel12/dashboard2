import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getHSCodeSuggestion(description: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a customs classification expert. When analyzing product descriptions, provide the most appropriate HS code and detailed description.
          
          Respond with a JSON object containing:
          {
            "hsCode": "string (6-10 digit HS code)",
            "description": "string (detailed product description)",
            "confidence": number between 0.0-1.0,
            "reasoning": "string (explain why this classification is appropriate)",
            "alternativeCodes": [
              {
                "hsCode": "string (HS code)",
                "description": "string (description)",
                "reason": "string (why this might be applicable)"
              }
            ]
          }`
        },
        {
          role: "user",
          content: description
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    
    return {
      hsCode: result.hsCode || 'Not found',
      description: result.description || 'No description available',
      confidence: result.confidence || 0,
      reasoning: result.reasoning || 'No reasoning provided',
      alternativeCodes: result.alternativeCodes || []
    };
  } catch (error) {
    console.error('Error getting HS code suggestion:', error);
    throw error;
  }
}

export async function analyzeProductImage(imageBase64: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a customs classification expert. When analyzing product images:
          1. Identify visible product characteristics
          2. Note any markings or labels
          3. Determine product category and function
          
          Respond with a JSON object containing:
          {
            "hsCode": "string (HS code)",
            "description": "string (detailed product description)",
            "confidence": number between 0.0-1.0,
            "identifiedFeatures": ["array of key features"],
            "reasoning": "string (explain why this classification is appropriate)",
            "alternativeCodes": [
              {
                "hsCode": "string (HS code)",
                "description": "string (description)",
                "reason": "string (why this might be applicable)"
              }
            ]
          }`
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      hsCode: result.hsCode || 'Not found',
      description: result.description || 'No description available',
      confidence: result.confidence || 0,
      identifiedFeatures: result.identifiedFeatures || [],
      reasoning: result.reasoning || 'No reasoning provided',
      alternativeCodes: result.alternativeCodes || []
    };
  } catch (error) {
    console.error('Error analyzing product image:', error);
    throw error;
  }
}

export async function analyzeTechnicalDrawing(drawingBase64: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a technical expert in customs classification. When analyzing technical drawings:
          1. Identify key dimensions and specifications
          2. Note materials and components
          3. Analyze technical characteristics
          
          Respond with a JSON object containing:
          {
            "hsCode": "string (HS code)",
            "description": "string (detailed product description)",
            "confidence": number between 0.0-1.0,
            "technicalDetails": {
              "dimensions": "string",
              "materials": ["array of materials"],
              "components": ["array of components"]
            },
            "reasoning": "string (explain why this classification is appropriate)",
            "alternativeCodes": [
              {
                "hsCode": "string (HS code)",
                "description": "string (description)",
                "reason": "string (why this might be applicable)"
              }
            ]
          }`
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${drawingBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      hsCode: result.hsCode || 'Not found',
      description: result.description || 'No description available',
      confidence: result.confidence || 0,
      technicalDetails: result.technicalDetails || {
        dimensions: 'Not specified',
        materials: [],
        components: []
      },
      reasoning: result.reasoning || 'No reasoning provided',
      alternativeCodes: result.alternativeCodes || []
    };
  } catch (error) {
    console.error('Error analyzing technical drawing:', error);
    throw error;
  }
} 