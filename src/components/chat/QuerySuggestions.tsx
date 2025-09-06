import { Button } from '@/components/ui/button';
import { TrendingUp, MapPin, Thermometer, Droplets } from 'lucide-react';

interface QuerySuggestionsProps {
  onSuggestionClick: (query: string) => void;
}

const suggestions = [
  {
    icon: Thermometer,
    label: 'North Atlantic Trends',
    query: 'Show temperature trends in the North Atlantic over 2023 with anomaly analysis'
  },
  {
    icon: Droplets,
    label: 'Basin Comparison',
    query: 'Compare salinity between Pacific and Atlantic basins with statistical significance'
  },
  {
    icon: MapPin,
    label: 'Mediterranean Floats',
    query: 'Display ARGO float trajectories in the Mediterranean with T-S profiles'
  },
  {
    icon: TrendingUp,
    label: 'Seasonal Analysis',
    query: 'Analyze seasonal temperature variations at 200m depth across major basins'
  }
];

export const QuerySuggestions = ({ onSuggestionClick }: QuerySuggestionsProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">Quick Queries</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-3 flex flex-col items-center gap-2 hover:bg-accent/50 transition-colors"
              onClick={() => onSuggestionClick(suggestion.query)}
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-xs text-center">{suggestion.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};