require('dotenv').config();
const multer = require('multer');
const path = require('path');

const uploadDir = path.resolve(process.cwd(), 'uploads', 'products');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const random = Math.random().toString(36).slice(2, 8);
    const name = `${Date.now()}-${random}${ext}`;
    cb(null, name);
  },
});

const allowed = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/jpg')
  .split(',')
  .map((t) => t.trim());

function fileFilter(req, file, cb) {
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG and PNG are allowed'));
  }
}

const limits = { fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10) };

const upload = multer({ storage, fileFilter, limits });

// Export middleware to handle single image file field named 'image'
module.exports = upload.single('image');
