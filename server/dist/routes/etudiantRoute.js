"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const etudiantController_1 = require("../controllers/etudiantController");
const requireAuth_1 = require("../middleware/requireAuth");
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const multer = require('multer');
const router = (0, express_1.Router)();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, (0, uuid_1.v4)() + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = multer({ storage, fileFilter });
// router.get('/images/:filename', getImage);
// router.get('/', getEtudiants);
// router.post('/', upload.single('photo'), createEtudiant);
// router.put('/:etudiantID', updateEtudiant);
// router.delete('/:etudiantID/:photo', deleteEtudiant);
router.get('/images/:filename', requireAuth_1.requireAuth, etudiantController_1.getImage);
router.get('/', requireAuth_1.requireAuth, etudiantController_1.getEtudiants);
router.post('/', requireAuth_1.requireAuth, upload.single('photo'), etudiantController_1.createEtudiant);
router.put('/:etudiantID', requireAuth_1.requireAuth, etudiantController_1.updateEtudiant);
router.delete('/:etudiantID/:photo', requireAuth_1.requireAuth, etudiantController_1.deleteEtudiant);
exports.default = router;
