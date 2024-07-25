import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'public/schoolImages'); 
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
});


const upload = multer({ storage });

export default upload;
