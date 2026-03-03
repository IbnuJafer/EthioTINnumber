import Tin from "../models/Tin.js";
import generateTIN from "../utils/generateTIN.js";
import mongoose from "mongoose";

export const applyTIN = async (req, res) => {
  try {
    console.log("\n📝 TIN APPLICATION RECEIVED");
    console.log("📦 BODY:", req.body);
    console.log("👤 USER ID:", req.user.id);
    
    // Convert string ID to MongoDB ObjectId
    const userId = new mongoose.Types.ObjectId(req.user.id);
    
    const existing = await Tin.findOne({ user: userId });
    if (existing) {
      console.log("⚠️ TIN already exists for user:", req.user.id);
      return res.status(400).json({ message: "TIN already applied" });
    }
    
    console.log("🏗️ Creating TIN for region:", req.body.region, "city:", req.body.city);
    
    const tin = await Tin.create({
      tinNumber: generateTIN(),
      user: userId,
      nationalId: req.body.nationalId,
      region: req.body.region,
      city: req.body.city,
    });
    
    console.log("✅ TIN SAVED SUCCESSFULLY:", tin);
    
    // Return simplified response
    res.status(201).json({
      tinNumber: tin.tinNumber,
      status: tin.status,
      nationalId: tin.nationalId,
      region: tin.region,
      city: tin.city,
      createdAt: tin.createdAt
    });
  } catch (error) {
    console.log("❌ ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getMyTIN = async (req, res) => {
  try {
    console.log("\n🔍 GET MY TIN - User ID:", req.user.id);
    
    // Convert string ID to MongoDB ObjectId
    const userId = new mongoose.Types.ObjectId(req.user.id);
    
    const tin = await Tin.findOne({ user: userId });
    
    if (!tin) {
      console.log("⚠️ No TIN found for user:", req.user.id);
      return res.status(404).json({ message: "TIN not found" });
    }
    
    console.log("✅ TIN found:", tin.tinNumber);
    res.json(tin);
  } catch (error) {
    console.log("❌ ERROR in getMyTIN:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const verifyTIN = async (req, res) => {
  try {
    const tin = await Tin.findOne({ tinNumber: req.params.tinNumber }).populate("user", "fullName");
    if (!tin) return res.status(404).json({ valid: false, message: "TIN not found" });
    res.json({ valid: true, fullName: tin.user.fullName, status: tin.status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all TIN applications
export const getAllTINs = async (req, res) => {
  try {
    const tins = await Tin.find().populate("user", "fullName email").sort({ createdAt: -1 });
    res.json(tins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update TIN status (approve/reject)
export const updateTINStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    
    const tin = await Tin.findByIdAndUpdate(
      req.params.id,
      { status, issuedDate: status === "approved" ? new Date() : null },
      { new: true }
    );
    
    if (!tin) return res.status(404).json({ message: "TIN not found" });
    res.json(tin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
