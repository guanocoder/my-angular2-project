import { AuthAction, AuthActions } from "./auth.actions";


export interface AuthState {
    token: string;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
}

export function authReducer(state = initialState, action: AuthAction) {

    switch(action.type) {
        case AuthActions.SignedIn:
        case AuthActions.SignedUp:
            return {
                ...state,
                isAuthenticated: true,
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
            }
        default:
            return state;
    }
}