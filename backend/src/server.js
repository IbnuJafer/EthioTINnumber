import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tinRoutes from "./routes/tinRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminTinRoutes from "./routes/adminTinRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboard.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  // Add your Vercel frontend URL after deployment (e.g., "https://ethiotin.vercel.app")
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? allowedOrigins 
    : ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tin", tinRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/tin", adminTinRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);

// API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "eTIN API Running 🚀", timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../../etin-frontend/dist");
  app.use(express.static(staticPath));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("eTIN API Running 🚀 - Development Mode");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});
