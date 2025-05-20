import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  link: {
    type: String, // optional, e.g. "Go to your profile"
  },
  type:{
    type:String
  }
}, { timestamps: true }); // createdAt, updatedAt automatically

export const Notification =  mongoose.model('Notification', notificationSchema);
