import multer from "multer";
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const uploadPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

//create multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const isImage = file.fieldname==Image;
    const subfolder = 'profilePictures'
    const fullPath = path.join(uploadPath, subfolder)

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true })
    }
    cb(null, fullPath)
  },
  filename: (req, file, cb) => {
    const fileName = req.body.name || 'no name'
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9-_]/g, '_');
    const uniqueName = `${sanitizedName}${path.extname(file.originalname)}`
    cb(null, uniqueName)
  }
});
//file filter
const fileFilter = (req, file, cb) => {

  const imageTypes = /jpg|jpeg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (imageTypes.test(ext)) {
    cb(null, true)
  } else {
    cb(new Error('Unsupported file type'), false)
  }
}
const upload = multer({
  storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 }
})
export const handleImageUpload = (req, res) => {
  return new Promise((resolve, reject) => {
    const singleUpload = upload.single('image');
    singleUpload(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(req.file);
    });
  });
};