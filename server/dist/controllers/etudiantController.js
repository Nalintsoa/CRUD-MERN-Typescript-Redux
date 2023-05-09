"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.deleteEtudiant = exports.getEtudiants = exports.updateEtudiant = exports.createEtudiant = void 0;
// import { Document } from 'mongoose';
const etudiantModel_1 = __importDefault(require("../models/etudiantModel"));
const fs_1 = __importDefault(require("fs"));
const createEtudiant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = {
        nomComplet: {
            nom: req.body.nom,
            prenom: req.body.prenom,
        },
        dateNaiss: new Date(req.body.dateNaiss),
        sexe: req.body.sexe,
        photo: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename,
        nbFrere: req.body.nbFrere
    };
    let newEtudiant = new etudiantModel_1.default(data);
    yield newEtudiant
        .save()
        .then(() => {
        return res.status(200).json({ message: "Etudiant enregistré", data: newEtudiant });
    })
        .catch((err) => res.send(err));
});
exports.createEtudiant = createEtudiant;
const updateEtudiant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield etudiantModel_1.default.updateOne({ _id: req.params.etudiantID }, req.body, { new: true })
        .then((etudiant) => {
        return res.status(200).json({ message: "Etudiant modifié", data: etudiant });
    })
        .catch((err) => res.send(err));
});
exports.updateEtudiant = updateEtudiant;
const getEtudiants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield etudiantModel_1.default.find({})
        .then((etudiants) => {
        return res.status(200).json({ message: "Liste de tous les étudiants", data: etudiants });
    }
    // (etudiants) => {
    //     etudiants.map(etu => {
    //         let dataFromBack: IEtudiant = {
    //             nomComplet: {
    //                 nom: etu.nomComplet.nom,
    //                 prenom: etu.nomComplet.prenom,
    //             },
    //             dateNaiss: new Date(req.body.dateNaiss),
    //             sexe: etu.sexe,
    //             photo: `/images/${etu.photo}`,
    //             nbFrere: etu.nbFrere
    //         }
    //     });
    //     return res.status(200).json({ message: "Liste de tous les étudiants", data: etudiants });
    // }
    )
        .catch((err) => res.send(err));
});
exports.getEtudiants = getEtudiants;
const deleteEtudiant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield etudiantModel_1.default.deleteOne({ _id: req.params.etudiantID })
        .then((etudiant) => {
        // supprimer l'image
        fs_1.default.unlink(`D:/67/MERN/First MERN/back/images/${req.params.photo}`, (err) => {
            if (err) {
                console.log(err);
            }
        });
        return res.status(200).json({ message: "Étudiant supprimé", data: etudiant });
    })
        .catch((err) => res.send(err));
});
exports.deleteEtudiant = deleteEtudiant;
const getImage = (req, res, next) => {
    let image_filename = req.params.filename;
    res.sendFile(`D:/67/MERN/First MERN/back/images/${image_filename}`);
    // res.send('fdsd');
};
exports.getImage = getImage;
