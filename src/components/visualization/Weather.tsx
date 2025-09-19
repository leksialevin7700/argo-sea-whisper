import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CloudRain, Wind, Thermometer, MapPin, AlertTriangle } from 'lucide-react';

type ForecastDay = { date: string; temp: number; rain: number; wind: number; alert: string };

type WeatherWidgetProps = {
  fullScreen?: boolean;
};

export function WeatherWidget({ fullScreen = false }: WeatherWidgetProps) {
  const [lat, setLat] = useState<number>(13.0827); // Chennai default
  const [lon, setLon] = useState<number>(80.2707);
  const [location, setLocation] = useState<string>('Chennai Coast');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);

  const riskAlerts = useMemo(() => {
    return forecast
      .filter((f) => f.rain >= 70 || f.wind >= 80)
      .map((f) => ({
        date: f.date,
        type: f.rain >= 70 && f.wind >= 80 ? 'Flood & Cyclone Risk' : f.rain >= 70 ? 'Flood Risk' : 'Cyclone Risk',
      }));
  }, [forecast]);

  async function fetchForecast(nextLat: number, nextLon: number, name?: string) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get('/api/forecast', {
        params: { lat: nextLat, lon: nextLon, location: name || location },
      });
      setLocation(data.location || location);
      setForecast(data.forecast || []);
    } catch (e: any) {
      setError(e?.response?.data?.error || 'Failed to fetch forecast');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchForecast(lat, lon, location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function useMyLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLat(latitude);
      setLon(longitude);
      fetchForecast(latitude, longitude, 'My Location');
    });
  }

  if (fullScreen) {
    return (
      <div className="relative w-full h-full">
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="flex items-center justify-between rounded-md border border-border bg-card/90 backdrop-blur px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location} ({lat.toFixed(2)}, {lon.toFixed(2)})</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => fetchForecast(lat, lon)}>Refresh</Button>
              <Button size="sm" onClick={useMyLocation}>Use my location</Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-10 space-y-2">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {forecast.slice(0, 3).map((f) => (
              <Card key={f.date} className="border-border bg-card/90 backdrop-blur">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{f.date}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex items-center gap-2"><Thermometer className="h-4 w-4" /> {f.temp}°C</div>
                  <div className="flex items-center gap-2"><CloudRain className="h-4 w-4" /> {f.rain}%</div>
                  <div className="flex items-center gap-2"><Wind className="h-4 w-4" /> {f.wind} km/h</div>
                  <div className="text-xs text-muted-foreground">{f.alert}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <MapContainer center={[lat, lon]} zoom={7} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {forecast.slice(0, 3).map((f) => (
            <Marker key={f.date} position={[lat, lon]}>
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">{location} - {f.date}</div>
                  <div>Temp: {f.temp}°C</div>
                  <div>Rain: {f.rain}%</div>
                  <div>Wind: {f.wind} km/h</div>
                  <div>Alert: {f.alert}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-4 lg:col-span-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location} ({lat.toFixed(2)}, {lon.toFixed(2)})</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => fetchForecast(lat, lon)}>Refresh</Button>
            <Button size="sm" onClick={useMyLocation}>Use my location</Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Forecast Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {forecast.slice(0, 3).map((f) => (
            <Card key={f.date} className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{f.date}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex items-center gap-2"><Thermometer className="h-4 w-4" /> {f.temp}°C</div>
                <div className="flex items-center gap-2"><CloudRain className="h-4 w-4" /> {f.rain}%</div>
                <div className="flex items-center gap-2"><Wind className="h-4 w-4" /> {f.wind} km/h</div>
                <div className="text-xs text-muted-foreground">{f.alert}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="h-[50vh] lg:col-span-2">
        <MapContainer center={[lat, lon]} zoom={7} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {forecast.slice(0, 3).map((f) => (
            <Marker key={f.date} position={[lat, lon]}>
              <Popup>
                <div className="text-sm">
                  <div className="font-medium">{location} - {f.date}</div>
                  <div>Temp: {f.temp}°C</div>
                  <div>Rain: {f.rain}%</div>
                  <div>Wind: {f.wind} km/h</div>
                  <div>Alert: {f.alert}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}



