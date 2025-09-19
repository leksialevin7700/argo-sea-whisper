import { Router } from "express";
import { Alert } from "../models/Alert.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const alerts = await Alert.find({ status: "active" }).sort({ timestamp: -1 }).limit(200).lean();
    return res.json({ alerts });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

router.post("/seed", async (_req, res) => {
  try {
    const demo = await Alert.create({
      parameter: "salinity",
      value: 38.2,
      threshold: "> 37 PSU",
      severity: "critical",
      location: { name: "Chennai Coast", lat: 13.0827, lon: 80.2707 },
      status: "active",
      message: "Alert: Salinity exceeded safe range",
    });
    return res.json({ ok: true, demo });
  } catch (err) {
    return res.status(500).json({ error: "Failed to seed alert" });
  }
});

export default router;


