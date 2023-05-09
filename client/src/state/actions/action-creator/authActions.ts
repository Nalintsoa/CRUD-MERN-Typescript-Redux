import axios from "axios"
import { Dispatch } from "redux"
import { AuthEnum, IActionAuthUser } from "../action-type/authType"

export const handleLoginFormOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    return (dispatch: Dispatch<IActionAuthUser>) => {
        dispatch({
            type: AuthEnum.UPDATE_LOGIN_FORM,
            payload: {
                event: e
            }
        })
    }
}

export const resetLoginForm = () => {
    return (dispatch: Dispatch<IActionAuthUser>) => {
        dispatch({
            type: AuthEnum.RESET_LOGIN_FORM
        });
    }
}

export const authLogIn = () => {
    return (dispatch: Dispatch<IActionAuthUser>) => {
        dispatch({
            type: AuthEnum.AUTH_LOGIN
        })
    }
}

export const authLogOut = () => {
    return (dispatch: Dispatch<IActionAuthUser>) => {
        dispatch({
            type: AuthEnum.AUTH_LOGOUT
        })
    }
}

export const logoutFromBack = async () => {
    await axios.get("/user/logout", { withCredentials: true });
    authLogOut();
}