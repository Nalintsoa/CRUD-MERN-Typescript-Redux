import Router from 'express';
import { sendMail } from '../controllers/mailController';
import path from 'path'

const router = Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, 'uploads');
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post('/send', upload.single('piece_jointe'), sendMail);

export default router;