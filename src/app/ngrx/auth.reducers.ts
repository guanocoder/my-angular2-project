import { AuthAction, Actions } from "./auth.actions";


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
        case Actions.SignIn:
        case Actions.SignUp:
            return {
                ...state,
                isAuthenticated: true,
            }
        case Actions.LogOut:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            }
        case Actions.SetToken:
            return {
                ...state,
                token: action.token,
            }
        default:
            return state;
    }
}