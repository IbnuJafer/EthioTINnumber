import express from "express";
import { applyTIN, getMyTIN, verifyTIN, getAllTINs, updateTINStatus } from "../controllers/tinController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/apply", protect, applyTIN);
router.get("/my-tin", protect, getMyTIN);
router.get("/verify/:tinNumber", verifyTIN);

// Admin routes
router.get("/all", protect, getAllTINs);
router.put("/status/:id", protect, updateTINStatus);

export default router;
