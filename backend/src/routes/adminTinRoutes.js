import express from "express";
import TIN from "../models/Tin.js";
import { protectAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

// Get all pending TINs
router.get("/pending", protectAdmin, async (req, res) => {
  try {
    const tins = await TIN.find({ status: "pending" }).populate("user", "fullName email");
    res.json(tins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all TINs (for admin dashboard)
router.get("/all", protectAdmin, async (req, res) => {
  try {
    const tins = await TIN.find().populate("user", "fullName email").sort({ createdAt: -1 });
    res.json(tins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve TIN
router.put("/approve/:id", protectAdmin, async (req, res) => {
  try {
    const tin = await TIN.findById(req.params.id);
    if (!tin) return res.status(404).json({ message: "TIN not found" });

    tin.status = "approved";
    await tin.save();
    res.json({ message: "TIN approved", tin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject TIN
router.put("/reject/:id", protectAdmin, async (req, res) => {
  try {
    const tin = await TIN.findById(req.params.id);
    if (!tin) return res.status(404).json({ message: "TIN not found" });

    tin.status = "rejected";
    await tin.save();
    res.json({ message: "TIN rejected", tin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
