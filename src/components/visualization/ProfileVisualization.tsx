import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { Layers, ArrowDown } from 'lucide-react';

interface ProfileVisualizationProps {
  data: any;
}

// Mock depth profile data
const depthProfile = [
  { depth: 0, temp: 24.8, salinity: 35.2, density: 1022.5 },
  { depth: 10, temp: 24.6, salinity: 35.2, density: 1022.6 },
  { depth: 25, temp: 24.1, salinity: 35.3, density: 1023.1 },
  { depth: 50, temp: 22.8, salinity: 35.4, density: 1023.8 },
  { depth: 75, temp: 20.2, salinity: 35.5, density: 1024.9 },
  { depth: 100, temp: 18.1, salinity: 35.6, density: 1025.8 },
  { depth: 150, temp: 15.4, salinity: 35.7, density: 1026.7 },
  { depth: 200, temp: 12.8, salinity: 35.8, density: 1027.2 },
  { depth: 300, temp: 9.2, salinity: 35.7, density: 1027.4 },
  { depth: 500, temp: 6.1, salinity: 35.5, density: 1027.6 },
  { depth: 750, temp: 4.2, salinity: 35.3, density: 1027.7 },
  { depth: 1000, temp: 3.1, salinity: 35.1, density: 1027.8 },
];

// T-S Diagram data
const tsData = depthProfile.map(d => ({
  temperature: d.temp,
  salinity: d.salinity,
  depth: d.depth,
}));

export const ProfileVisualization = ({ data }: ProfileVisualizationProps) => {
  return (
    <div className="h-full space-y-4">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          <div>
            <h4 className="font-medium">Depth Profile Analysis</h4>
            <p className="text-sm text-muted-foreground">WMO Float 4901234 - Latest Cast</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">
            <ArrowDown className="h-3 w-3 mr-1" />
            1000m Max Depth
          </Badge>
          <Badge variant="outline">CTD Profile</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
        {/* Temperature Profile */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Temperature Profile</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={depthProfile}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="temp"
                  label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -10 }}
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  dataKey="depth"
                  domain={[0, 1000]}
                  reversed
                  label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip 
                  labelFormatter={(value) => `Depth: ${value}m`}
                  formatter={(value: any) => [`${value}°C`, 'Temperature']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--popover-foreground))',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ r: 3, fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Salinity Profile */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Salinity Profile</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={depthProfile}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="salinity"
                  domain={[35.0, 36.0]}
                  label={{ value: 'Salinity (PSU)', position: 'insideBottom', offset: -10 }}
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  dataKey="depth"
                  domain={[0, 1000]}
                  reversed
                  label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft' }}
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip 
                  labelFormatter={(value) => `Depth: ${value}m`}
                  formatter={(value: any) => [`${value} PSU`, 'Salinity']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--popover-foreground))',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="salinity" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  dot={{ r: 3, fill: 'hsl(var(--accent))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* T-S Diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Temperature-Salinity Diagram</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={tsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="salinity"
                domain={[35.0, 36.0]}
                label={{ value: 'Salinity (PSU)', position: 'insideBottom', offset: -10 }}
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                dataKey="temperature"
                label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 11 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  name === 'temperature' ? `${value}°C` : `${value} PSU`,
                  name === 'temperature' ? 'Temperature' : 'Salinity'
                ]}
                labelFormatter={(label, payload) => 
                  payload && payload[0] ? `Depth: ${payload[0].payload.depth}m` : ''
                }
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--popover-foreground))',
                  fontSize: '12px'
                }}
              />
              <Scatter 
                dataKey="temperature" 
                fill="hsl(var(--primary))"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};