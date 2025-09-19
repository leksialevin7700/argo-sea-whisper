import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectToDatabase } from "./lib/db.js";
import authRouter from "./routes/auth.js";
import forecastRouter from "./routes/forecast.js";
import alertsRouter from "./routes/alerts.js";
import { startAlertScheduler } from "./lib/alertChecker.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/forecast", forecastRouter);
app.use("/api/alerts", alertsRouter);

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectToDatabase();
  // Seed one demo alert if none exists
  try {
    const { Alert } = await import('./models/Alert.js');
    const count = await Alert.countDocuments();
    if (count === 0) {
      await Alert.create({
        parameter: 'temperature',
        value: 31.5,
        threshold: '> 30°C',
        severity: 'warning',
        location: { name: 'Bay of Bengal', lat: 14.5, lon: 82.1 },
        status: 'active',
        message: 'Heatwave: Sea surface temperature elevated',
      });
    }
  } catch {}
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${PORT}`);
  });
  startAlertScheduler();
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server", err);
  process.exit(1);
});


