import { Forecast } from '../models/Forecast.js';
import { Alert } from '../models/Alert.js';

function classifySeverity(parameter, value) {
  // Warning: near threshold; Critical: clearly beyond
  switch (parameter) {
    case 'salinity':
      if (value >= 37.5 || value <= 29.5) return 'critical';
      if (value > 37 || value < 30) return 'warning';
      return null;
    case 'temperature':
      if (value >= 32) return 'critical';
      if (value > 30) return 'warning';
      return null;
    case 'oxygen':
      if (value <= 1.5) return 'critical';
      if (value < 2) return 'warning';
      return null;
    case 'ph':
      if (value <= 7.6) return 'critical';
      if (value < 7.8) return 'warning';
      return null;
    default:
      return null;
  }
}

export async function runAlertCheck() {
  // This prototype uses Forecast collection (temp/rain/wind). In a real system,
  // readings for salinity/oxygen/ph would come from another collection.
  const since = new Date(Date.now() - 10 * 60 * 1000); // last 10 minutes
  const recent = await Forecast.find({ createdAt: { $gte: since } }).limit(200).lean();

  for (const r of recent) {
    // Temperature rule from Forecast.temp
    const tempSeverity = classifySeverity('temperature', r.temp);
    if (tempSeverity) {
      const exists = await Alert.findOne({
        'location.lat': r.lat,
        'location.lon': r.lon,
        parameter: 'temperature',
        status: 'active',
      });
      if (!exists) {
        await Alert.create({
          parameter: 'temperature',
          value: r.temp,
          threshold: '> 30°C',
          severity: tempSeverity,
          location: { name: r.location, lat: r.lat, lon: r.lon },
          status: 'active',
          message: tempSeverity === 'critical' ? 'Critical heat stress detected' : 'Temperature near heat stress threshold',
        });
      }
    }
  }
}

export function startAlertScheduler(intervalMs = 5 * 60 * 1000) {
  // Every 5 minutes by default
  setInterval(() => {
    runAlertCheck().catch(() => {});
  }, intervalMs);
}


