import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin',
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpiresAt: Date,
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
}, { timestamps: true });

export const Admin = mongoose.model("Admin", adminSchema);
