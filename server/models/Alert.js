import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema(
  {
    parameter: { type: String, enum: ["salinity", "temperature", "oxygen", "ph"], required: true },
    value: { type: Number, required: true },
    threshold: { type: String, required: true },
    severity: { type: String, enum: ["warning", "critical"], required: true },
    location: {
      name: { type: String, default: "Location" },
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
    status: { type: String, enum: ["active", "resolved"], default: "active" },
    message: { type: String },
  },
  { timestamps: { createdAt: "timestamp", updatedAt: true } }
);

export const Alert = mongoose.models.Alert || mongoose.model("Alert", AlertSchema);


