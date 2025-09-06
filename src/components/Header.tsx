import { Activity, Database, Waves } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-lg border border-border">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Waves className="h-6 w-6 text-primary ocean-wave" />
          <span className="font-semibold text-lg">ARGO Data Status</span>
        </div>
        <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
          <Activity className="h-3 w-3 mr-1 data-pulse" />
          Live Data Active
        </Badge>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Database className="h-4 w-4" />
          <span>3.2M Records</span>
        </div>
        <div className="text-xs">Last Updated: 2 min ago</div>
      </div>
    </div>
  );
};