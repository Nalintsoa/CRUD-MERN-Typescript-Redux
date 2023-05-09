"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EtudiantSchema = new mongoose_1.default.Schema({
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
const EtudiantModel = mongoose_1.default.model('Etudiant', EtudiantSchema);
exports.default = EtudiantModel;
