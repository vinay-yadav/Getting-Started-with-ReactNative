import { AsyncStorage } from "react-native";

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

const API_KEY = 'AIzaSyA0hovDDWMDhYxPRyugoyqwQeu9A-808fI';


let timer;


export const didTryAutoAL = () => {
    return {
        type: SET_DID_TRY_AL
    }
}


export const authenticate = (token, userId, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({
            type: AUTHENTICATE,
            token,
            userId
        });
    }
}


export const signUp = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            }
        )

        if (!response.ok) {
            const errResp = await response.json();
            throw new Error(errResp.error.message);
        }

        const respData = await response.json();

        dispatch(authenticate(respData.idToken, respData.localId, parseInt(respData.expiresIn) * 1000));

        const expirationDate = new Date(new Date().getTime() + parseInt(respData.expiresIn) * 1000);
        saveDataToStorage(respData.idToken, respData.localId, expirationDate.toISOString());
    }
}


export const logIn = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            }
        )

        if (!response.ok) {
            const errResp = await response.json();
            throw new Error(errResp.error.message);
        }

        const respData = await response.json();

        dispatch(authenticate(respData.idToken, respData.localId, parseInt(respData.expiresIn) * 1000));

        const expirationDate = new Date(new Date().getTime() + parseInt(respData.expiresIn) * 1000);
        saveDataToStorage(respData.idToken, respData.localId, expirationDate.toISOString());
    }
}


export const logout = () => {
    AsyncStorage.removeItem('userData');
    clearLogoutTimer();
    return { type: LOGOUT }
}

const clearLogoutTimer = () => {
    if (timer)
        clearTimeout(timer);
}


const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime)
    }
}


const saveDataToStorage = (token, userId, expiresIn) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        userId,
        expiresIn
    }))
}
