import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { bindActionCreators } from 'redux';
import { StateType } from "../state/reducers";
import * as authActionCreators from "../state/actions/action-creator/authActions"
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
    children: React.ReactNode
}

const RequireAuth = (props: RequireAuthProps) => {
    const dispatch = useDispatch();
    const authState = useSelector((state: StateType) => state.authReducer);
    const { authLogOut, authLogIn } = bindActionCreators(authActionCreators, dispatch);

    const check_auth = async () => {
        try {
            await axios.get("/user/check_auth", { withCredentials: true });
            authLogIn()
        } catch (err) {
            authLogOut()
        }
    }

    useEffect(() => {
        // if (authState.loggedIn === null) {
        check_auth();
        // }
    }, []);

    if (authState.loggedIn === null) {
        return <div>Loading ...</div>
    }

    if (authState.loggedIn === false) {
        // return <div>Please log in</div>
        return <Navigate to="/login" />
    }

    return (
        <div>{props.children}</div>
    )
}

export default RequireAuth;