import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Shared fields
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['user', 'artist'],
    default: 'user',
  },
  profilePicture: {
    type: String,
    default: '',
  },

  // Auth & verification
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,

  // Regular User-only fields
  userName: {
    type: String,
    unique: true,
    sparse: true, // allows nulls without clashing
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId], // ref to artist users
    ref: 'User',
    default: [],
  },

  // Artist-only fields
  fullname: String,
  stageName: {
    type: String,
    unique: true,
    sparse: true,
  },
  bio: String,
  socials: {
    type: Object,
    default: {
      instagram: "",
      facebook: "",
      twitter: "",
      tiktok: "",
      youtube: ""
    }
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId], // ref to user users
    ref: 'User',
    default: [],
  },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
