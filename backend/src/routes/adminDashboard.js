import express from "express";
import TIN from "../models/Tin.js";
import { protectAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

// Admin dashboard: counts & lists by status
router.get("/", protectAdmin, async (req, res) => {
  try {
    const [pending, approved, rejected] = await Promise.all([
      TIN.find({ status: "pending" }).populate("user", "fullName email"),
      TIN.find({ status: "approved" }).populate("user", "fullName email"),
      TIN.find({ status: "rejected" }).populate("user", "fullName email"),
    ]);

    res.json({
      counts: {
        pending: pending.length,
        approved: approved.length,
        rejected: rejected.length,
      },
      lists: {
        pending,
        approved,
        rejected,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
