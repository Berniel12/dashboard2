import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const extractDataFromText = async (text: string) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Extract the following information from the text: client name, declaration type, port of entry, shipment value, description, HS code, country of origin, weight, and quantity. Text: ${text}`,
      max_tokens: 150,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error extracting data:', error);
    throw error;
  }
}; 