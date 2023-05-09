import { combineReducers } from "redux";
import authReducer from "./authReducer";
import etudiantReducer from "./etudiantReducer";
import listeEtudiantReducer from "./listeEtudiantReducer";

const reducers = combineReducers({
    etudiant: etudiantReducer,
    listeEtudiant: listeEtudiantReducer,
    authReducer: authReducer
});

export default reducers;

export type StateType = ReturnType<typeof reducers>;