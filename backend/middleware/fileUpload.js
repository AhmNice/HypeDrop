import { upload } from "../config/multerConfig.js";
import  cloudinary  from "../config/cloudinaryConfig.js"; 
import streamifier from "streamifier";

/**
 * Uploads a buffer to Cloudinary.
 * @param {Buffer} buffer - The file buffer from multer.
 * @param {Object} options - Cloudinary upload options (e.g., folder, resource_type).
 * @returns {Promise<Object>} - The Cloudinary upload result.
 */
export const uploadToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!Buffer.isBuffer(buffer)) {
      return reject(new Error('Invalid buffer passed to Cloudinary upload'));
    }

    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (result) resolve(result);
      else reject(error);
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

