import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Thermometer, Droplets, Activity, FlaskConical } from 'lucide-react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

type AlertItem = {
  _id: string;
  parameter: 'salinity' | 'temperature' | 'oxygen' | 'ph';
  value: number;
  threshold: string;
  severity: 'warning' | 'critical';
  location: { name: string; lat: number; lon: number };
  timestamp: string;
  message?: string;
};

const paramIcon = (p: AlertItem['parameter']) => {
  switch (p) {
    case 'temperature': return <Thermometer className="h-4 w-4" />;
    case 'salinity': return <Droplets className="h-4 w-4" />;
    case 'oxygen': return <Activity className="h-4 w-4" />;
    case 'ph': return <FlaskConical className="h-4 w-4" />;
  }
};

const severityColor = (s: AlertItem['severity']) => s === 'critical' ? 'text-red-600' : 'text-yellow-600';
const badgeBg = (s: AlertItem['severity']) => s === 'critical' ? 'bg-red-100' : 'bg-yellow-100';

const Alerts = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [center, setCenter] = useState<[number, number]>([13.0827, 80.2707]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/alerts');
      setAlerts(data.alerts || []);
      if ((data.alerts || []).length > 0) {
        setCenter([data.alerts[0].location.lat, data.alerts[0].location.lon]);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-surface-gradient">
      <Navbar />
      <div className="container mx-auto px-4 py-6 max-w-7xl space-y-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <h1 className="text-xl font-semibold">Active Alerts</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            {alerts.map((a) => (
              <Card key={a._id} className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    {paramIcon(a.parameter)}
                    <span className="capitalize">{a.parameter}</span>
                    <span className={`${badgeBg(a.severity)} ${severityColor(a.severity)} text-xs px-2 py-0.5 rounded-full ml-auto capitalize`}>{a.severity}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-1">
                  <div><span className="text-muted-foreground">Value:</span> {a.value}</div>
                  <div><span className="text-muted-foreground">Threshold:</span> {a.threshold}</div>
                  <div><span className="text-muted-foreground">Location:</span> {a.location.name}</div>
                  <div className="text-xs text-muted-foreground">{new Date(a.timestamp).toLocaleString()}</div>
                  {a.message && <div className="text-xs">{a.message}</div>}
                </CardContent>
              </Card>
            ))}
            {alerts.length === 0 && (
              <div className="text-sm text-muted-foreground">No active alerts.</div>
            )}
          </div>
          <div className="lg:col-span-2">
            <div className="h-[50vh] rounded-md overflow-hidden border border-border">
              <MapContainer center={center} zoom={6} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {alerts.map((a) => (
                  <Marker key={a._id} position={[a.location.lat, a.location.lon]}>
                    <Popup>
                      <div className="text-sm">
                        <div className="font-medium capitalize">{a.parameter} - {a.severity}</div>
                        <div>Value: {a.value} (Threshold: {a.threshold})</div>
                        <div>Location: {a.location.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">{new Date(a.timestamp).toLocaleString()}</div>
                        {a.message && <div className="text-xs mt-1">{a.message}</div>}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;


