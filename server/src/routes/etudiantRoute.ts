import { Request, Router } from 'express';
import { FileFilterCallback } from 'multer';
import { getEtudiants, createEtudiant, updateEtudiant, deleteEtudiant, getImage } from '../controllers/etudiantController';
import { requireAuth } from '../middleware/requireAuth';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const multer = require('multer');

const router: Router = Router();

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, 'images');
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage, fileFilter })

// router.get('/images/:filename', getImage);
// router.get('/', getEtudiants);
// router.post('/', upload.single('photo'), createEtudiant);
// router.put('/:etudiantID', updateEtudiant);
// router.delete('/:etudiantID/:photo', deleteEtudiant);

router.get('/images/:filename', requireAuth, getImage);
router.get('/', requireAuth, getEtudiants);
router.post('/', requireAuth, upload.single('photo'), createEtudiant);
router.put('/:etudiantID', requireAuth, updateEtudiant);
router.delete('/:etudiantID/:photo', requireAuth, deleteEtudiant);

export default router;