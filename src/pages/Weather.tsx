import { Navbar } from '@/components/Navbar';
import { WeatherWidget } from '@/components/visualization/Weather';

const Weather = () => {
  return (
    <div className="min-h-screen bg-surface-gradient">
      <Navbar />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <WeatherWidget />
      </div>
    </div>
  );
};

export default Weather;


