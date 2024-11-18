'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Minimize2, Maximize2, Volume2, VolumeX } from 'lucide-react';
import { realtimeConfig, realtimeHeaders } from '@/utils/realtime-api';
import AudioVisualizer from './AudioVisualizer';
import { useEffect as useEffectLayout } from 'react';

type AssistantState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [assistantState, setAssistantState] = useState<AssistantState>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const webSocketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioAnalyserRef = useRef<AnalyserNode | null>(null);

  // Initialize component before mounting
  useEffectLayout(() => {
    // Ensure window is defined (client-side only)
    if (typeof window !== 'undefined') {
      // Initialize any required stores or contexts
      const init = async () => {
        try {
          // Initialize audio context
          if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
          }
        } catch (error) {
          console.error('Error initializing audio context:', error);
        }
      };

      init();
    }
  }, []);

  // Initialize WebSocket connection
  const initializeWebSocket = () => {
    console.log('Initializing WebSocket connection...');
    
    // Create WebSocket with proper authentication
    const wsUrl = new URL(realtimeConfig.baseURL);
    wsUrl.searchParams.append('token', realtimeConfig.apiKey || '');
    
    console.log('Connecting to WebSocket URL:', wsUrl.toString());
    
    const ws = new WebSocket(wsUrl.toString());
    
    ws.onopen = () => {
      console.log('WebSocket connection established');
      // Send initial configuration
      ws.send(JSON.stringify({
        type: 'init',
        config: {
          ...realtimeConfig.sessionConfig,
          auth_token: realtimeConfig.apiKey
        }
      }));
    };

    ws.onmessage = async (event) => {
      console.log('Received WebSocket message:', event.data);
      try {
        const response = JSON.parse(event.data);
        
        switch (response.type) {
          case 'init_success':
            console.log('Initialization successful');
            break;

          case 'transcription':
            console.log('Transcription:', response.text);
            setMessages(prev => [...prev, {
              role: 'user',
              content: response.text,
              timestamp: new Date()
            }]);
            break;

          case 'response':
            console.log('Assistant response:', response.text);
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: response.text,
              timestamp: new Date()
            }]);
            break;

          case 'audio':
            if (response.data) {
              console.log('Received audio response');
              const audioData = new Uint8Array(response.data);
              await playAudioResponse(audioData);
            }
            break;

          case 'error':
            console.error('API Error:', response.error);
            break;

          default:
            console.log('Unknown message type:', response);
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      // Try to reconnect
      setTimeout(() => {
        if (isListening) {
          console.log('Attempting to reconnect...');
          initializeWebSocket();
        }
      }, 3000);
    };

    ws.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
      if (event.code !== 1000) { // Not a normal closure
        // Try to reconnect
        setTimeout(() => {
          if (isListening) {
            console.log('Attempting to reconnect...');
            initializeWebSocket();
          }
        }, 3000);
      }
    };

    webSocketRef.current = ws;
  };

  // Initialize audio context and media recorder
  const initializeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000,
        } 
      });

      audioContextRef.current = new AudioContext({
        sampleRate: 16000,
      });
      
      // Create and configure analyzer node
      audioAnalyserRef.current = audioContextRef.current.createAnalyser();
      audioAnalyserRef.current.fftSize = 64;
      
      // Connect microphone to analyzer
      const microphone = audioContextRef.current.createMediaStreamSource(stream);
      microphone.connect(audioAnalyserRef.current);
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 16000
      });

      // Handle audio data
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0 && webSocketRef.current?.readyState === WebSocket.OPEN) {
          // Send audio chunk
          webSocketRef.current.send(JSON.stringify({
            type: 'audio',
            data: event.data
          }));
        }
      };

      mediaRecorderRef.current.onstop = () => {
        if (webSocketRef.current?.readyState === WebSocket.OPEN) {
          webSocketRef.current.send(JSON.stringify({ type: 'end' }));
        }
      };

      console.log('Audio initialized successfully');
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  };

  // Play audio response
  const playAudioResponse = async (audioData: Uint8Array) => {
    if (!audioContextRef.current || isMuted) return;

    try {
      setIsSpeaking(true);
      const audioBuffer = await audioContextRef.current.decodeAudioData(audioData.buffer);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      source.onended = () => {
        setIsSpeaking(false);
      };
      
      source.start(0);
    } catch (error) {
      console.error('Error playing audio response:', error);
      setIsSpeaking(false);
    }
  };

  const handleStartListening = async () => {
    try {
      console.log('Starting listening...');
      
      // First get audio permission and setup
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 48000
        } 
      });

      console.log('Audio permission granted');

      // Initialize audio context
      audioContextRef.current = new AudioContext({ sampleRate: 48000 });
      
      // Create and configure analyzer node
      audioAnalyserRef.current = audioContextRef.current.createAnalyser();
      audioAnalyserRef.current.fftSize = 64;
      
      // Connect microphone to analyzer
      const microphone = audioContextRef.current.createMediaStreamSource(stream);
      microphone.connect(audioAnalyserRef.current);

      console.log('Audio context and analyzer set up');

      // Initialize WebSocket if needed
      if (!webSocketRef.current || webSocketRef.current.readyState !== WebSocket.OPEN) {
        initializeWebSocket();
      }

      // Initialize MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current.ondataavailable = async (event) => {
        if (event.data.size > 0 && webSocketRef.current?.readyState === WebSocket.OPEN) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result && webSocketRef.current?.readyState === WebSocket.OPEN) {
              const audioData = new Uint8Array(reader.result as ArrayBuffer);
              webSocketRef.current.send(audioData);
            }
          };
          reader.readAsArrayBuffer(event.data);
        }
      };

      mediaRecorderRef.current.start(100);
      setIsListening(true);
      setAssistantState('listening');

    } catch (error) {
      console.error('Error in handleStartListening:', error);
      setIsListening(false);
      setAssistantState('idle');
    }
  };

  const handleStopListening = () => {
    console.log('Stopping listening...');
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      setAssistantState('idle');
    }
  };

  // Clean up function
  useEffect(() => {
    return () => {
      console.log('Cleaning up...');
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 z-50"
      >
        <Volume2 className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-xl z-50 transition-all duration-200 ${
      isExpanded ? 'w-96 h-[80vh]' : 'w-80 h-[400px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Volume2 className="w-5 h-5 text-blue-500" />
          <span className="font-medium">Virtual Assistant</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-12rem)]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-lg p-3 ${
              message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Audio Visualizer */}
      <div className="px-4 py-2 border-t">
        <AudioVisualizer 
          isListening={isListening} 
          isSpeaking={isSpeaking}
          analyser={audioAnalyserRef.current}
        />
      </div>

      {/* Status and Controls */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {assistantState === 'idle' && 'Ready to help'}
            {assistantState === 'listening' && 'Listening...'}
            {assistantState === 'thinking' && 'Processing...'}
            {assistantState === 'speaking' && 'Speaking...'}
          </span>
          <button
            onClick={isListening ? handleStopListening : handleStartListening}
            className={`p-3 rounded-full ${
              isListening
                ? 'bg-red-100 text-red-500'
                : 'bg-blue-100 text-blue-500'
            } hover:opacity-80 transition-colors`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
} 