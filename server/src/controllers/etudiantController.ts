import { Request, Response, NextFunction } from 'express';
// import { Document } from 'mongoose';
import Etudiant, { IEtudiant } from '../models/etudiantModel';
import fs from 'fs';

export const createEtudiant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data: IEtudiant = {
        nomComplet: {
            nom: req.body.nom,
            prenom: req.body.prenom,
        },
        dateNaiss: new Date(req.body.dateNaiss),
        sexe: req.body.sexe,
        photo: req.file?.filename,
        nbFrere: req.body.nbFrere
    }
    let newEtudiant = new Etudiant(data);
    await newEtudiant
        .save()
        .then(() => {
            return res.status(200).json({ message: "Etudiant enregistré", data: newEtudiant });
        })
        .catch((err) => res.send(err));
};

export const updateEtudiant = async (req: Request, res: Response, next: NextFunction) => {
    await Etudiant.updateOne({ _id: req.params.etudiantID }, req.body, { new: true })
        .then((etudiant) => {
            return res.status(200).json({ message: "Etudiant modifié", data: etudiant });
        })
        .catch((err) => res.send(err));
};

export const getEtudiants = async (req: Request, res: Response, next: NextFunction) => {
    await Etudiant.find({})
        .then(
            (etudiants) => {
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
};

export const deleteEtudiant = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Etudiant.deleteOne({ _id: req.params.etudiantID })
        .then((etudiant) => {
            // supprimer l'image
            fs.unlink(`D:/67/MERN/First MERN/back/images/${req.params.photo}`, (err) => {
                if (err) {
                    console.log(err);
                }
            })

            return res.status(200).json({ message: "Étudiant supprimé", data: etudiant });
        })
        .catch((err) => res.send(err));
};

export const getImage = (req: Request, res: Response, next: NextFunction) => {
    let image_filename = req.params.filename;
    res.sendFile(`D:/67/MERN/First MERN/back/images/${image_filename}`);
    // res.send('fdsd');
}