import fs from 'fs'
import path from 'path'



export const deleteFile = async (folderPath, fileName)=>{
  const filePath = path.join(folderPath,fileName);
   fs.unlink(filePath, (err)=>{
    if (err) {
      console.error(`Error deleting ${filePath}:`, err);
      // res.status(400).json({success:false, message:'error deleting'});
      return;
    }
    console.log(`Deleted file: ${filePath}`);
  })
}