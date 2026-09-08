import { Router } from 'express';
import multer from 'multer';
import { Readable } from 'stream';
import { requireAuth } from '../middleware/auth.js';
import cloudinary from '../config/cloudinary.js';

const router = Router();

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
];

// Store the uploaded file temporarily in memory
const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return cb(
        new Error('Only JPG, PNG, WEBP, or GIF images are allowed.')
      );
    }

    cb(null, true);
  },
});

// Upload buffer to Cloudinary
function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'namy',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}

// Admin-only image upload
router.post(
  '/',
  requireAuth,
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'No file uploaded.',
        });
      }

      const result = await uploadToCloudinary(req.file.buffer);

      return res.status(201).json({
        url: result.secure_url,
        public_id: result.public_id,
      });

    } catch (error) {
      console.error('Cloudinary upload error:', error);

      return res.status(500).json({
        error: 'Failed to upload image.',
      });
    }
  }
);

export default router;