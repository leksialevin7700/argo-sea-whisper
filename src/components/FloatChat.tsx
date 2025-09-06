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
      if (lowerQuery.includes('north atlantic')) {
        return 'Analysis complete! The North Atlantic shows a warming trend of +0.8°C at surface level from 2020-2023. Notable findings: Gulf Stream maintains 24-26°C, while Labrador Sea shows seasonal variation of 8-16°C. The thermocline depth has shifted ~15m deeper. Strong correlation (r=0.87) between surface temperature and NAO index.';
      }
      return 'Temperature analysis reveals significant spatial heterogeneity. Surface temperatures range 2-29°C globally, with strongest warming in Arctic regions (+1.2°C/decade). Deep waters (>1000m) show minimal warming except in the North Atlantic. Seasonal amplitude varies from 1°C in tropics to 12°C in temperate regions.';
    }
    
    if (lowerQuery.includes('salinity')) {
      if (lowerQuery.includes('pacific') && lowerQuery.includes('atlantic')) {
        return 'Comparative salinity analysis: Pacific shows lower average salinity (34.7 PSU) vs Atlantic (35.2 PSU). Pacific exhibits stronger halocline at 50-150m depth. Atlantic deep water is more saline due to Mediterranean outflow. Statistical significance: p<0.001 for basin differences.';
      }
      return 'Salinity patterns reveal ocean circulation dynamics. Highest values (>37 PSU) in evaporation-dominated regions like Mediterranean. Lowest (<33 PSU) near river outflows and polar ice melt. Vertical profiles show typical halocline development with seasonal mixing variations.';
    }
    
    if (lowerQuery.includes('trend') || lowerQuery.includes('change') || lowerQuery.includes('anomal')) {
      return 'Climate trend analysis from 15 years of ARGO data: Ocean heat content increased by 14.2 ± 3.1 ZJ. Salinity trends show "rich get richer" pattern - salty regions getting saltier (+0.02 PSU/decade), fresh regions getting fresher. 68% of floats show significant warming trends (p<0.05).';
    }
    
    if (lowerQuery.includes('depth') || lowerQuery.includes('profile')) {
      return 'Vertical profile analysis complete. Thermocline depth averages 150m globally but varies 50-300m seasonally. Mixed layer depth shows strong seasonal cycle: 50m (summer) to 200m (winter). Oxygen minimum zones detected at 200-600m depth in Pacific and Indian Oceans.';
    }
    
    if (lowerQuery.includes('mediterranean') || lowerQuery.includes('med')) {
      return 'Mediterranean Sea analysis: Dense water formation in Gulf of Lions drives thermohaline circulation. Surface warming +0.9°C since 2000. Deep water (>1500m) shows 13.2°C, 38.7 PSU - characteristic of Mediterranean Outflow Water. 47 active ARGO floats currently deployed.';
    }
    
    return 'Oceanographic analysis complete! The ARGO Global Ocean Observatory has provided unprecedented insights into ocean variability. Current dataset includes 3.2M temperature-salinity profiles from 4,800+ floats. Key findings highlight accelerating ocean changes and regional variability patterns. What specific parameter would you like to investigate further?';
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