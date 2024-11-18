export const realtimeConfig = {
  apiKey: process.env.NEXT_PUBLIC_OPENAI_REALTIME_API_KEY,
  baseURL: 'wss://api.endpoints.anyscale.com/v1/realtime',
  sessionConfig: {
    event_id: `session_${Date.now()}`,
    type: 'session.create',
    session: {
      modalities: ['text', 'audio'],
      instructions: `You are an AI assistant for a customs broker platform. Your role is to help with:
        - Checking shipment statuses and providing updates
        - Managing customs declarations and documentation
        - Handling client communications
        - Monitoring compliance requirements
        - Providing insights on bottlenecks and efficiency`,
      voice: 'alloy',
      input_audio_format: 'webm',
      output_audio_format: 'webm',
      input_audio_transcription: {
        model: 'whisper-1'
      },
      turn_detection: {
        type: 'server_vad',
        threshold: 0.5,
        prefix_padding_ms: 300,
        silence_duration_ms: 500
      },
      temperature: 0.7,
      max_response_output_tokens: 150
    }
  }
};

export const realtimeHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${realtimeConfig.apiKey}`,
  'OpenAI-Beta': 'realtime=v1'
}; 