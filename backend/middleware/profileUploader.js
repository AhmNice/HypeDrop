import cloudinary from '../config/cloudinaryConfig.js';
import { User } from '../models/user.model.js';
import path from 'path';

export const profilePictureUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    if (!req.userId) {
      return res.status(400).json({ success: false, message: 'userId is required' });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'HypeDrop/profilePicture',
          resource_type: 'image',
          public_id: path.parse(req.file.originalname).name,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    // Update user's profilePicture field in the database
    const user = await User.findOneAndUpdate(
      { _id: req.userId },
      { profilePicture: uploadResult.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Profile picture uploaded successfully',
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Upload failed' });
  }
};
