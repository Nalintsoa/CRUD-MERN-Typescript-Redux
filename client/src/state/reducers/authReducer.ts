
import axios from "axios";
import { AuthEnum, IActionAuthUser } from "../actions/action-type/authType";

export interface IAuthUser {
    email: string;
    password: string;
    loggedIn: boolean | null;
}

const initialState: IAuthUser = {
    email: '',
    password: '',
    loggedIn: null
}

const authReducer = (state = initialState, action: IActionAuthUser) => {
    switch (action.type) {
        case (AuthEnum.UPDATE_LOGIN_FORM):
            const { name, value } = action.payload.event.target
            return {
                ...state,
                [name]: value
            }
        case (AuthEnum.RESET_LOGIN_FORM):
            return initialState;
        case (AuthEnum.AUTH_LOGIN):
            return {
                ...state,
                loggedIn: true
            }

        case (AuthEnum.AUTH_LOGOUT):
            return {
                ...state,
                loggedIn: false
            }
        default:
            return state
    }
}

export default authReducer;