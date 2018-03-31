import { AuthAction, AuthActions } from "./auth.actions";


export interface AuthState {
    token: string;
    isAuthenticated: boolean;
    errorMessage: string;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    errorMessage: null
}

export function authReducer(state = initialState, action: AuthAction) {

    switch(action.type) {
        case AuthActions.SignedIn:
        case AuthActions.SignedUp:
            return {
                ...state,
                isAuthenticated: true,
                errorMessage: null,
            }
        case AuthActions.LogOut:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            }
        case AuthActions.SetToken:
            return {
                ...state,
                token: action.token,
                errorMessage: null,
            }
        case AuthActions.ErrorOnSignIn:
            return {
                ...state,
                errorMessage: action.message,
            }
        default:
            return state;
    }
}