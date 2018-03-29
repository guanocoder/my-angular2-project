import { Action } from '@ngrx/store';

export enum AuthActions {
    TrySignUp = "TRY_SIGN_UP",
    TrySignIn = "TRY_SIGN_IN",
    TryLogOut = "TRY_LOG_OUT",
    SignedUp = "SIGN_UP",
    SignedIn = "SIGN_IN",
    LogOut = "LOG_OUT",
    SetToken = "SET_TOKEN"
}

export class TrySignUpAction implements Action {
    readonly type = AuthActions.TrySignUp;
    constructor(public email: string,
                public password: string) {}
}

export class TrySignInAction implements Action {
    readonly type = AuthActions.TrySignIn;
    constructor(public email: string,
                public password: string) {}
}

export class TryLogOutAction implements Action {
    readonly type = AuthActions.TryLogOut;
}

export class SignUpAction implements Action {
    readonly type = AuthActions.SignedUp;
}

export class SignInAction implements Action {
    readonly type = AuthActions.SignedIn;
}

export class LogOutAction implements Action {
    readonly type = AuthActions.LogOut;
}

export class SetTokenAction implements Action {
    readonly type = AuthActions.SetToken;

    constructor(public token: string) {}
}

export type AuthAction = SignUpAction | SignInAction | LogOutAction | SetTokenAction;