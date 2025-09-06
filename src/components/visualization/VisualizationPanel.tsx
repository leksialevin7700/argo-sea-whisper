import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart3, Map, Layers, Download, Maximize2 } from 'lucide-react';
import { ChartVisualization } from './ChartVisualization';
import { MapVisualization } from './MapVisualization';
import { ProfileVisualization } from './ProfileVisualization';

interface VisualizationPanelProps {
  visualization: {
    type: 'chart' | 'map' | 'profile';
    data: any;
  } | null;
}

export const VisualizationPanel = ({ visualization }: VisualizationPanelProps) => {
  const [activeTab, setActiveTab] = useState('chart');

  const handleExport = () => {
    // Placeholder for export functionality
    console.log('Exporting visualization...');
  };

  if (!visualization) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Data Visualization
          </h3>
          <p className="text-sm text-muted-foreground">Visualizations will appear here</p>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-lg mb-2">No Visualization Selected</h4>
              <p className="text-sm text-muted-foreground max-w-sm">
                Ask the AI assistant about ocean data to generate interactive charts, maps, and depth profiles.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Data Visualization
          </h3>
          <p className="text-sm text-muted-foreground">Interactive ARGO data analysis</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Visualization Content */}
      <div className="flex-1 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="chart" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              Maps
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Profiles
            </TabsTrigger>
          </TabsList>

          <div className="flex-1">
            <TabsContent value="chart" className="h-full m-0">
              <ChartVisualization data={visualization.data} />
            </TabsContent>
            
            <TabsContent value="map" className="h-full m-0">
              <MapVisualization data={visualization.data} />
            </TabsContent>
            
            <TabsContent value="profile" className="h-full m-0">
              <ProfileVisualization data={visualization.data} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};