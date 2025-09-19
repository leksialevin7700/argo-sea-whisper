import { Router } from "express";
import axios from "axios";
import { Forecast } from "../models/Forecast.js";

const router = Router();

function classifyAlert(probRainPct, windKmh) {
  if (probRainPct >= 70 && windKmh >= 80) return "Heavy Rain & High Wind";
  if (probRainPct >= 70) return "Heavy Rain";
  if (windKmh >= 80) return "High Wind";
  return "Normal";
}

router.get("/", async (req, res) => {
  try {
    const lat = parseFloat(String(req.query.lat || ""));
    const lon = parseFloat(String(req.query.lon || ""));
    const location = String(req.query.location || "Location");
    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return res.status(400).json({ error: "lat and lon are required numeric parameters" });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY || "66e94e6d3a3171edc979d751a7c99c1d";
    if (!apiKey) return res.status(500).json({ error: "Missing OPENWEATHER_API_KEY" });

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const { data } = await axios.get(url);

    // Reduce to next 3 days using 3-hourly list entries
    const days = new Map();
    for (const entry of data.list) {
      const date = entry.dt_txt.split(" ")[0];
      if (!days.has(date)) days.set(date, []);
      days.get(date).push(entry);
    }

    const forecast = Array.from(days.entries())
      .slice(0, 3)
      .map(([date, entries]) => {
        const temps = entries.map((e) => e.main.temp);
        const avgTemp = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
        const rainProb = Math.round(
          (entries.reduce((a, e) => a + (e.pop || 0), 0) / entries.length) * 100
        );
        const windAvg = Math.round(
          entries.reduce((a, e) => a + (e.wind?.speed || 0), 0) / entries.length * 3.6 // m/s to km/h
        );
        const alert = classifyAlert(rainProb, windAvg);
        return { date, temp: avgTemp, rain: rainProb, wind: windAvg, alert };
      });

    // Save each day as a doc for auditing
    await Forecast.insertMany(
      forecast.map((f) => ({
        location,
        lat,
        lon,
        temp: f.temp,
        rainfall: f.rain,
        wind: f.wind,
        alert: f.alert,
        timestamp: new Date(`${f.date}T00:00:00Z`),
      }))
    );

    return res.json({ location, forecast });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch forecast" });
  }
});

export default router;


