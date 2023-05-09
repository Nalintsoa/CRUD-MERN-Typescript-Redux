import { IEtudiant } from "../../reducers/etudiantReducer"

export enum EtudiantEnum {
    CREATE = "create_etudiant",
    UPDATE = "update_etudiant",
    DELETE = "delete_etudiant",
    HANDLEONCHANGE = "handle_on_change",
    HANDLEDATEONCHANGE = "handle_date_on_change",
    HANDLEFILEONCHANGE = "handle_file_on_change",
    RESET = "reset",
    FETCHDATA = "fetch_data"
}

interface CreateAction {
    type: EtudiantEnum.CREATE,
    payload: {
        body: IEtudiant
    }
}

interface UpdateAction {
    type: EtudiantEnum.UPDATE,
    payload: {
        id: string,
        body: IEtudiant
    }
}

interface DeleteAction {
    type: EtudiantEnum.DELETE,
    payload: {
        id: string
    }
}

interface HandleOnChange {
    type: EtudiantEnum.HANDLEONCHANGE,
    payload: {
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    }
}

interface HandleDateOnChange {
    type: EtudiantEnum.HANDLEDATEONCHANGE,
    payload: {
        e: any
    }
}

interface HandleFileOnChange {
    type: EtudiantEnum.HANDLEFILEONCHANGE,
    payload: {
        event: any
    }
}

interface Reset {
    type: EtudiantEnum.RESET
}

interface FetchData {
    type: EtudiantEnum.FETCHDATA,
    payload: {
        fetch: any[]
    }
}


export type IActionEtudiant = CreateAction | UpdateAction | DeleteAction | HandleOnChange | HandleDateOnChange | Reset | FetchData | HandleFileOnChange;
