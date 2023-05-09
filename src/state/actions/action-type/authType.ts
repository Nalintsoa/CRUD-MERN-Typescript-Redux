export enum AuthEnum {
    UPDATE_LOGIN_FORM = "update_login_form",
    RESET_LOGIN_FORM = "reset_login_form",
    AUTH_LOGIN = "auth_login",
    CHECK_AUTH = "check_auth",
    AUTH_LOGOUT = "auth_logout"
}

interface UpdateAction {
    type: AuthEnum.UPDATE_LOGIN_FORM,
    payload: {
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    }
}

interface ResetAction {
    type: AuthEnum.RESET_LOGIN_FORM,
}

interface AuthLoginAction {
    type: AuthEnum.AUTH_LOGIN
}

interface CheckAuth {
    type: AuthEnum.AUTH_LOGOUT
}

export type IActionAuthUser = UpdateAction | AuthLoginAction | CheckAuth | ResetAction;