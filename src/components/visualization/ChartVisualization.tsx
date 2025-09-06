import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ChartVisualizationProps {
  data: any;
}

// Mock data for demonstration
const temperatureData = [
  { month: 'Jan', surface: 18.2, depth100: 15.4, depth500: 8.1 },
  { month: 'Feb', surface: 18.8, depth100: 15.1, depth500: 8.3 },
  { month: 'Mar', surface: 20.1, depth100: 16.2, depth500: 8.8 },
  { month: 'Apr', surface: 22.3, depth100: 17.8, depth500: 9.2 },
  { month: 'May', surface: 24.7, depth100: 19.1, depth500: 9.8 },
  { month: 'Jun', surface: 26.8, depth100: 20.4, depth500: 10.1 },
  { month: 'Jul', surface: 28.2, depth100: 21.7, depth500: 10.4 },
  { month: 'Aug', surface: 28.9, depth100: 22.1, depth500: 10.6 },
  { month: 'Sep', surface: 27.4, depth100: 21.3, depth500: 10.2 },
  { month: 'Oct', surface: 24.8, depth100: 19.8, depth500: 9.7 },
  { month: 'Nov', surface: 21.9, depth100: 17.9, depth500: 9.1 },
  { month: 'Dec', surface: 19.1, depth100: 16.2, depth500: 8.4 },
];

const salinityData = [
  { depth: 0, salinity: 35.2, temperature: 24.1 },
  { depth: 50, salinity: 35.4, temperature: 23.8 },
  { depth: 100, salinity: 35.6, temperature: 20.2 },
  { depth: 200, salinity: 35.8, temperature: 16.5 },
  { depth: 300, salinity: 35.9, temperature: 12.8 },
  { depth: 500, salinity: 35.7, temperature: 9.2 },
  { depth: 750, salinity: 35.5, temperature: 6.4 },
  { depth: 1000, salinity: 35.3, temperature: 4.8 },
];

export const ChartVisualization = ({ data }: ChartVisualizationProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-base font-medium">Temperature Trends by Depth</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--popover-foreground))'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="surface" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Surface"
              />
              <Line 
                type="monotone" 
                dataKey="depth100" 
                stroke="hsl(var(--accent))" 
                strokeWidth={2}
                name="100m Depth"
              />
              <Line 
                type="monotone" 
                dataKey="depth500" 
                stroke="hsl(var(--secondary))" 
                strokeWidth={2}
                name="500m Depth"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-base font-medium">Salinity vs Depth Profile</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salinityData}>
              <defs>
                <linearGradient id="salinityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="depth" 
                label={{ value: 'Depth (m)', position: 'insideBottom', offset: -10 }}
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                label={{ value: 'Salinity (PSU)', angle: -90, position: 'insideLeft' }}
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--popover-foreground))'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="salinity" 
                stroke="hsl(var(--accent))" 
                fillOpacity={1}
                fill="url(#salinityGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};