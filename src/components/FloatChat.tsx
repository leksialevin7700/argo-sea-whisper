import { useState } from 'react';
import { ChatInterface } from './chat/ChatInterface';
import { VisualizationPanel } from './visualization/VisualizationPanel';
import { Header } from './Header';
import { QuerySuggestions } from './chat/QuerySuggestions';
import oceanHero from '@/assets/ocean-hero.jpg';

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  visualization?: {
    type: 'chart' | 'map' | 'profile';
    data: any;
  };
}

export const FloatChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to FloatChat! I\'m your AI assistant for exploring ARGO Ocean Data. Ask me about temperature trends, salinity measurements, or any oceanographic patterns you\'d like to investigate.',
      type: 'assistant',
      timestamp: new Date(),
    }
  ]);
  
  const [activeVisualization, setActiveVisualization] = useState<any>(null);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      type: 'user',
      timestamp: new Date(),
    };

    // Simulate AI response with visualization
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: generateResponse(content),
      type: 'assistant',
      timestamp: new Date(),
      visualization: generateVisualization(content),
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    
    if (assistantMessage.visualization) {
      setActiveVisualization(assistantMessage.visualization);
    }
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('temperature') || lowerQuery.includes('temp')) {
      return 'Based on ARGO float data, I\'ve generated a temperature analysis. The visualization shows sea surface temperature variations across different regions and depths. Would you like me to focus on a specific ocean basin or time period?';
    }
    
    if (lowerQuery.includes('salinity')) {
      return 'Here\'s the salinity data from ARGO floats. The map displays salinity measurements with depth profiles. I notice some interesting patterns in the North Atlantic - would you like me to explore those further?';
    }
    
    if (lowerQuery.includes('trend') || lowerQuery.includes('change')) {
      return 'I\'ve analyzed the long-term trends in the data. The time series shows significant variations over the past decade. The visualization highlights key seasonal patterns and anomalies.';
    }
    
    return 'I\'ve processed your oceanographic query and generated relevant visualizations. The data shows interesting patterns that might warrant further investigation. What specific aspect would you like to explore next?';
  };

  const generateVisualization = (query: string): { type: 'chart' | 'map' | 'profile'; data: any } => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('map') || lowerQuery.includes('location') || lowerQuery.includes('region')) {
      return { type: 'map' as const, data: 'global-map' };
    }
    
    if (lowerQuery.includes('depth') || lowerQuery.includes('profile')) {
      return { type: 'profile' as const, data: 'depth-profile' };
    }
    
    return { type: 'chart' as const, data: 'time-series' };
  };

  return (
    <div className="min-h-screen bg-surface-gradient">
      {/* Hero Section */}
      <div className="relative h-32 overflow-hidden">
        <img 
          src={oceanHero} 
          alt="ARGO Ocean Data Visualization" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ocean-gradient opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2 float-animation">
              FloatChat
            </h1>
            <p className="text-white/90">AI-Powered ARGO Ocean Data Explorer</p>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header />
        
        {/* Query Suggestions */}
        <div className="mb-6">
          <QuerySuggestions onSuggestionClick={handleSendMessage} />
        </div>

        {/* Dual Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          {/* Chat Panel */}
          <div className="bg-card rounded-lg border border-border shadow-lg">
            <ChatInterface 
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </div>

          {/* Visualization Panel */}
          <div className="bg-card rounded-lg border border-border shadow-lg">
            <VisualizationPanel visualization={activeVisualization} />
          </div>
        </div>
      </div>
    </div>
  );
};