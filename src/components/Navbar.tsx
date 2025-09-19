import { Link, useLocation } from 'react-router-dom';
import { Waves } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-full border-b border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 py-3 max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Waves className="h-6 w-6 text-primary" />
          <span className="font-semibold">Argo Sea Whisper</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/chat"
            className={`px-3 py-1.5 rounded-md text-sm ${isActive('/chat') ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
          >
            Chat
          </Link>
          <Link
            to="/weather"
            className={`px-3 py-1.5 rounded-md text-sm ${isActive('/weather') ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
          >
            Weather
          </Link>
          <Link
            to="/alerts"
            className={`px-3 py-1.5 rounded-md text-sm ${isActive('/alerts') ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
          >
            Alerts
          </Link>
        </div>
      </div>
    </nav>
  );
};


