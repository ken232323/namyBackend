import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.js';
import { resourceRouter } from './routes/resource.js';
import uploadRouter from './routes/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

// Serves uploaded images at http://localhost:4000/uploads/<filename>
// Uses the same STORAGE_DIR override as db.js and upload.js.
const UPLOADS_DIR = path.join(process.env.STORAGE_DIR || __dirname, 'uploads');
app.use('/uploads', express.static(UPLOADS_DIR));

app.use('/api/auth', authRouter);
app.use('/api/workshops', resourceRouter('workshops'));
app.use('/api/news', resourceRouter('news'));
app.use('/api/stats', resourceRouter('stats'));
app.use('/api/seminars', resourceRouter('seminars'));
app.use('/api/leadership', resourceRouter('leadership'));
app.use('/api/projects', resourceRouter('projects'));
app.use('/api/upload', uploadRouter);

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Handles multer errors (bad file type, too large) with a clean JSON response
// instead of a stack trace.
app.use((err, req, res, next) => {
  if (err) {
    const message = err.code === 'LIMIT_FILE_SIZE'
      ? 'Image is too large (max 5MB).'
      : err.message || 'Upload failed.';
    return res.status(400).json({ error: message });
  }
  next();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`NAMY backend running at http://localhost:${PORT}`);
});
