export const SIGN_UP = 'SIGN_UP';
export const LOGIN_IN = 'LOGIN_IN';
const API_KEY = 'AIzaSyA0hovDDWMDhYxPRyugoyqwQeu9A-808fI';


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

        if (!response.ok)
            throw new Error('Error in signUp');

        const respData = await response.json();

        console.log(respData);

        dispatch({
            type: SIGN_UP
        })
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

        if (!response.ok)
            throw new Error('Error in signUp');

        const respData = await response.json();

        console.log(respData);

        dispatch({
            type: LOGIN_IN
        })
    }
}