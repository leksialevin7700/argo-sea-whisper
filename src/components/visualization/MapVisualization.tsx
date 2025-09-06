import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Thermometer, Droplets, Navigation } from 'lucide-react';

interface MapVisualizationProps {
  data: any;
}

// Realistic ARGO float data with enhanced metadata
const argoFloats = [
  { id: 'WMO_4901234', lat: 25.5, lon: -80.2, temp: 24.8, salinity: 35.2, status: 'active', lastUpdate: '2024-01-15', cycles: 247, depth: 2000 },
  { id: 'WMO_4901235', lat: 28.1, lon: -82.4, temp: 23.1, salinity: 35.4, status: 'active', lastUpdate: '2024-01-14', cycles: 189, depth: 2000 },
  { id: 'WMO_4901236', lat: 22.8, lon: -79.8, temp: 26.2, salinity: 34.9, status: 'transmitting', lastUpdate: '2024-01-16', cycles: 156, depth: 2000 },  
  { id: 'WMO_4901237', lat: 26.7, lon: -81.1, temp: 25.4, salinity: 35.1, status: 'active', lastUpdate: '2024-01-13', cycles: 298, depth: 2000 },
  { id: 'WMO_4901238', lat: 24.2, lon: -83.5, temp: 24.1, salinity: 35.3, status: 'inactive', lastUpdate: '2023-12-28', cycles: 421, depth: 2000 },
  { id: 'WMO_4901239', lat: 27.3, lon: -78.9, temp: 25.8, salinity: 35.0, status: 'active', lastUpdate: '2024-01-16', cycles: 134, depth: 2000 },
  { id: 'WMO_4901240', lat: 23.7, lon: -81.3, temp: 24.9, salinity: 35.3, status: 'transmitting', lastUpdate: '2024-01-15', cycles: 203, depth: 2000 },
];

export const MapVisualization = ({ data }: MapVisualizationProps) => {
  return (
    <div className="h-full space-y-4">
      {/* Map Container */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            ARGO Float Locations - North Atlantic
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] relative">
          {/* Simplified Map Representation */}
          <div className="w-full h-full bg-depth-gradient rounded-lg relative overflow-hidden">
            {/* Ocean Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-6 h-full">
                {Array.from({ length: 48 }, (_, i) => (
                  <div key={i} className="border border-white/10" />
                ))}
              </div>
            </div>
            
            {/* Float Markers */}
            {argoFloats.map((float, index) => (
              <div
                key={float.id}
                className="absolute group cursor-pointer transform hover:scale-110 transition-transform"
                style={{
                  left: `${((float.lon + 85) / 10) * 100}%`,
                  top: `${((30 - float.lat) / 8) * 100}%`,
                }}
              >
                <div className={`w-3 h-3 rounded-full border-2 border-white shadow-lg ${
                  float.status === 'active' ? 'bg-primary' :
                  float.status === 'transmitting' ? 'bg-accent animate-pulse' :
                  'bg-muted-foreground'
                }`} />
                
                {/* Tooltip */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-popover border border-border rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 min-w-[160px]">
                  <div className="text-xs space-y-1">
                    <div className="font-medium">{float.id}</div>
                    <div className="flex items-center gap-1">
                      <Navigation className="h-3 w-3" />
                      {float.lat.toFixed(1)}°N, {Math.abs(float.lon).toFixed(1)}°W
                    </div>
                    <div className="flex items-center gap-1">
                      <Thermometer className="h-3 w-3" />
                      {float.temp}°C
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplets className="h-3 w-3" />
                      {float.salinity} PSU
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Legend */}
            <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
              <div className="text-xs font-medium mb-2">Float Status</div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Active ({argoFloats.filter(f => f.status === 'active').length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  <span>Transmitting ({argoFloats.filter(f => f.status === 'transmitting').length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                  <span>Inactive ({argoFloats.filter(f => f.status === 'inactive').length})</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Float Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Recent Measurements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {argoFloats.slice(0, 4).map((float) => (
              <div key={float.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{float.id}</div>
                  <div className="text-xs text-muted-foreground">
                    {float.lat.toFixed(1)}°N, {Math.abs(float.lon).toFixed(1)}°W
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {float.temp}°C
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {float.salinity} PSU
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};