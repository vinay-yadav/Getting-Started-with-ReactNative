import { AUTHENTICATE, didTryAutoAL, LOGIN_IN, LOGOUT, SET_DID_TRY_AL, SIGN_UP } from "../actions/auth";

const initialState = {
    token: null,
    userId: null,
    didTryAutoLogin: false
}


export default (state = initialState, action) => {
    switch (action.type) {
        // case SIGN_UP:
        //     return {
        //         token: action.token,
        //         userId: action.userId
        //     }

        // case LOGIN_IN:
        //     return {
        //         token: action.token,
        //         userId: action.userId
        //     }

        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId,
                didTryAutoLogin: true
            }

        case SET_DID_TRY_AL:
            return {
                ...state,
                didTryAutoLogin: true
            }

        case LOGOUT:
            return {
                ...initialState,
                didTryAutoLogin: true
            };

        default:
            return state;
    }
}
