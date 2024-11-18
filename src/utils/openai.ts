import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface HSCodeSuggestion {
  hsCode: string;
  description: string;
  confidence: number;
  reasoning: string;
  alternativeCodes: Array<{
    code: string;
    description: string;
    confidence: number;
  }>;
}

export async function getHSCodeSuggestion(content: string): Promise<HSCodeSuggestion> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a customs expert. Analyze the given text and suggest the most appropriate HS code."
        },
        {
          role: "user",
          content: `Please analyze this text and provide an HS code suggestion with confidence level and reasoning:
${content}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    return {
      hsCode: result.hsCode || result.hs_code || '0000.00',
      description: result.description || 'No description provided',
      confidence: result.confidence || 0,
      reasoning: result.reasoning || 'No reasoning provided',
      alternativeCodes: result.alternativeCodes || []
    };

  } catch (error) {
    console.error('Error getting HS code suggestion:', error);
    throw error;
  }
} 