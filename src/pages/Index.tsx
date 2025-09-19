import { Navbar } from "@/components/Navbar";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const Index = () => {
  const [hasAlert, setHasAlert] = useState(false);
  const [latestMsg, setLatestMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/alerts');
        if ((data.alerts || []).length > 0) {
          setHasAlert(true);
          setLatestMsg(data.alerts[0]?.message || `${data.alerts[0]?.parameter} ${data.alerts[0]?.severity}`);
        }
      } catch {}
    })();
  }, []);

  return (
    <div className="min-h-screen bg-surface-gradient">
      <Navbar />
      <div className="container mx-auto px-4 py-6 max-w-7xl space-y-4">
        {hasAlert && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{latestMsg}</AlertDescription>
          </Alert>
        )}
        <div className="rounded-lg border border-border bg-card p-6">
          <h1 className="text-xl font-semibold">Welcome</h1>
          <p className="text-sm text-muted-foreground mt-1">Use the navigation to access Chat, Weather, or Alerts.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
