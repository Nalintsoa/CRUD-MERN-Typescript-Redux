import mongoose, { Document, Model } from 'mongoose';

type EtudiantType = IEtudiant & Document;

export interface IEtudiant {
    nomComplet: {
        nom: string;
        prenom?: string;
    };
    dateNaiss: Date;
    sexe: string;
    photo?: string;
    nbFrere: number;
}

const EtudiantSchema = new mongoose.Schema<IEtudiant>({
    nomComplet: {
        nom: {
            type: String,
            required: true,
        },
        prenom: {
            type: String,
        }
    },
    dateNaiss: {
        type: Date,
        required: true
    },
    sexe: {
        type: String,
        required: true
    },
    photo: String,
    nbFrere: {
        type: Number,
        required: true
    }
});

const EtudiantModel: Model<EtudiantType> = mongoose.model<EtudiantType>('Etudiant', EtudiantSchema);

export default EtudiantModel;