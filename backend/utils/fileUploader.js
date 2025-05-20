import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Create multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isAudio = file.fieldname === 'audio';
    const subfolder = isAudio ? 'audios' : 'coverPhotos';
    const fullPath = path.join(uploadPath, subfolder);

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }

    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    const snippetTitle = req.body.title || 'untitled';
    const sanitizedTitle = snippetTitle.replace(/[^a-zA-Z0-9-_]/g, '_');
    const uniqueName = `${sanitizedTitle}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const isAudio = file.fieldname === 'audio';
  const audioTypes = /mp3|wav|m4a/;
  const imageTypes = /jpg|jpeg|png/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (isAudio && audioTypes.test(ext)) {
    cb(null, true);
  } else if (!isAudio && imageTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
}).fields([
  { name: 'audio', maxCount: 1 },
  { name: 'coverPhoto', maxCount: 1 }
]);

export const handleFileAndCoverUpload = (req, res) =>
  new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) return reject(err);
      resolve(req.files); // { audio: [file], coverPhoto: [file] }
    });
  });
