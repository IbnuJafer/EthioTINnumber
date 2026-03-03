import mongoose from "mongoose";

const tinSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tinNumber: {
      type: String,
      required: true,
      unique: true,
    },
    nationalId: String,
    region: String,
    city: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const TIN = mongoose.model("TIN", tinSchema);

export default TIN;
