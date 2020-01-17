import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const key = "AIzaSyAyGay_mHFl7NLc0tiLOdroWjw7b3S1HHY";
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key="+key;
        
        if (!isSignup) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key="+key;
        }

        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        axios.post(url, authData)
        .then(res => {
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem("idToken", res.data.idToken);
            localStorage.setItem("userId", res.data.localId);
            localStorage.setItem("expirationDate", expirationDate);
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
        })
        .catch(err => {
            let msg = err.message === "Network Error" ? "NO INTERNET CONNECTION" : err.response.data.error.message;
            dispatch(authFail(msg));
        });
    }
}

export const setAuthRedirectPath = ( path ) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const idToken = localStorage.getItem("idToken");

        if (!idToken) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(idToken, userId));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
}