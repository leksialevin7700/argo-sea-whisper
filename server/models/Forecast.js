import mongoose from "mongoose";

const forecastSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    temp: { type: Number, required: true },
    rainfall: { type: Number, required: true },
    wind: { type: Number, required: true },
    alert: { type: String, default: "Normal" },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Forecast = mongoose.models.Forecast || mongoose.model("Forecast", forecastSchema);


