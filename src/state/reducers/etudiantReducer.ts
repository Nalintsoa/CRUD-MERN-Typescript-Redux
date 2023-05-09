
import { EtudiantEnum, IActionEtudiant } from "../actions/action-type/etudiantType";

export interface IEtudiant {
    _id?: string,
    id: string,
    nomComplet: {
        nom: string,
        prenom: string,
    },
    dateNaiss: Date,
    sexe: string,
    photo: string,
    nbFrere: number
}

const unEtudiant: IEtudiant =
{
    id: '',
    nomComplet: {
        nom: '',
        prenom: '',
    },
    dateNaiss: new Date(),
    sexe: '',
    photo: '',
    nbFrere: 0
}

const etudiantReducer = (state = unEtudiant, action: IActionEtudiant) => {
    switch (action.type) {
        case EtudiantEnum.CREATE:
            return action.payload.body;
        case EtudiantEnum.UPDATE:
            if (state.id === action.payload.id) {
                return { ...state, ...action.payload.body }
            } else {
                return state;
            }
        case EtudiantEnum.DELETE:
            if (state.id === action.payload.id) {
                return {}
            } else {
                return {}
            }
        case EtudiantEnum.HANDLEONCHANGE:
            return {
                ...state,
                nomComplet: { ...state.nomComplet, [action.payload.event.target.name]: action.payload.event.target.value },
                [action.payload.event.target.name]: action.payload.event.target.value
            }
        case EtudiantEnum.HANDLEDATEONCHANGE:
            const dateN = action.payload.e.toDate();
            return { ...state, dateNaiss: dateN };
        case EtudiantEnum.HANDLEFILEONCHANGE:
            return {
                ...state,
                photo: action.payload.event.target.files[0]
            }
        case EtudiantEnum.RESET:
            return unEtudiant
        default:
            return state;
    }
}



export default etudiantReducer;