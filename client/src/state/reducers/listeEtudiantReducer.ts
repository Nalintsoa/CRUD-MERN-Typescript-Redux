import { EtudiantEnum, IActionEtudiant } from "../actions/action-type/etudiantType";
import { IEtudiant } from "./etudiantReducer";

const listeEtudiant: IEtudiant[] = [];

const listeEtudiantReducer = (state = listeEtudiant, action: IActionEtudiant) => {
    switch (action.type) {
        case EtudiantEnum.FETCHDATA:
            return action.payload.fetch
        default:
            return state
    }
}

export default listeEtudiantReducer;