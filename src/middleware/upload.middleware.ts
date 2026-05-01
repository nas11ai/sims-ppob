import multer from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, file, cb) => {
    const random = randomBytes(8).toString('hex');
    const ext = path.extname(file.originalname);
    cb(null, `${random}${ext}`);
  },
});

export const upload = multer({ storage });
