import { Dispatch } from "redux"

import { IEtudiant } from "../../reducers/etudiantReducer"
import { EtudiantEnum } from "../action-type/etudiantType"
import { IActionEtudiant } from "../action-type/etudiantType"
import axios from "axios"

export const createEtudiant = (etudiant: IEtudiant) => {
    return (dispatch: Dispatch<IActionEtudiant>) => {
        dispatch({
            type: EtudiantEnum.CREATE,
            payload: {
                body: etudiant
            }
        });
    }
}

export const updateEtudiant = (etudiant: IEtudiant) => {
    return (dispatch: Dispatch<IActionEtudiant>) => {
        dispatch({
            type: EtudiantEnum.UPDATE,
            payload: {
                id: etudiant.id,
                body: etudiant
            }
        });
    }
}

export const deleteEtudiant = (id: string) => {
    return (dispatch: Dispatch<IActionEtudiant>) => {
        dispatch({
            type: EtudiantEnum.DELETE,
            payload: {
                id: id
            }
        })
    }
}

export const handleOnChangeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    return (dispatch: Dispatch<IActionEtudiant>) => {
        dispatch({
            type: EtudiantEnum.HANDLEONCHANGE,
            payload: {
                event: event
            }
        })
    }
}

export const reset = () => {
    return (dispatch: Dispatch<IActionEtudiant>) => {
        dispatch({
            type: EtudiantEnum.RESET,
        })
    }
}

export const handleDateOnChangeChange = (e: any) => {
    return (dispatch: Dispatch<IActionEtudiant>) => {
        dispatch({
            type: EtudiantEnum.HANDLEDATEONCHANGE,
            payload: {
                e: e
            }
        })
    }
}

export const handleFileOnChangeChange = (e: any) => {
    return (dispatch: Dispatch<IActionEtudiant>) => {
        dispatch({
            type: EtudiantEnum.HANDLEFILEONCHANGE,
            payload: {
                event: e
            }
        })
    }
}

export const fetchDataData = () => {
    return async (dispatch: Dispatch<IActionEtudiant>) => {
        const fetch = await axios.get('/etudiant')
        dispatch({
            type: EtudiantEnum.FETCHDATA,
            payload: {
                fetch: fetch.data.data
            }
        })
    }
}