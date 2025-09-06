import { Button } from '@/components/ui/button';
import { TrendingUp, MapPin, Thermometer, Droplets } from 'lucide-react';

interface QuerySuggestionsProps {
  onSuggestionClick: (query: string) => void;
}

const suggestions = [
  {
    icon: Thermometer,
    label: 'Temperature Trends',
    query: 'Show me temperature trends in the Atlantic Ocean over the last 5 years'
  },
  {
    icon: Droplets,
    label: 'Salinity Analysis',
    query: 'Compare salinity levels between the Arabian Sea and Bay of Bengal'
  },
  {
    icon: MapPin,
    label: 'Regional Data',
    query: 'Show ARGO float locations and measurements in the Pacific Ocean'
  },
  {
    icon: TrendingUp,
    label: 'Depth Profiles',
    query: 'Generate depth profiles for temperature and salinity in the Mediterranean'
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