import multer from "multer";
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from "url";

// configure the directory name (__dirname) for ES modules cuz of type:'module'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

//base folder (uploads)
const uploadPath = path.join(__dirname,'..','uploads');
// let ensure if the uploads folder exists
if(!fs.existsSync(uploadPath)){
  // if it does not exist, let create it
  fs.mkdirSync(uploadPath, {recursive:true});
}

// multer storage config
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    // let define the subfolder (coverPhoto folder)
    const type= req.body.type || 'coverPhotos' ;
    const fullPath = path.join(uploadPath, type);

    // let check if the folder exists if not we create one
    if(!fs.existsSync(fullPath)){
      fs.mkdirSync(fullPath, {recursive:true})
    }
    cb(null, fullPath)
  },
  filename: function(req, file, cb){
    const snippetTitle = req.body.title || 'untitled';
    const sanitizedTitle = snippetTitle.replace(/[^a-zA-Z0-9-_]/g, '_');
    const uniqueName = `${sanitizedTitle}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null,uniqueName)
  }
});
const fileFilter=(req, file, cb)=>{
  const allowedTypes =/jpg|png|jpeg/;
  const ext = path.extname(file.originalname).toLowerCase();
  if(allowedTypes.test(ext)){
    cb(null, true)
  }else{
    cb(new Error('Only jpg, png or jpeg file are allowed'), false)
  }
}

const uploadSingleImage =multer({storage, fileFilter, limits:{fileSize: 2* 1024 * 1024}})
export const handleCoverPhotoUpload =(req, res)=>{
  new Promise((resolve, reject)=>{
    uploadSingleImage(req, res, (err)=>{
      if(err){
        reject(err)
      }else{
        resolve(req.file)
      }
    })
  })
}