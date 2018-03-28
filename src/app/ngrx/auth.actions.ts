import { Action } from '@ngrx/store';

export enum Actions {
    SignUp = "SIGN_UP",
    SignIn = "SIGN_IN",
    LogOut = "LOG_OUT",
    SetToken = "SET_TOKEN"
}

export class SignUpAction implements Action {
    readonly type = Actions.SignUp;
}

export class SignInAction implements Action {
    readonly type = Actions.SignIn;
}

export class LogOutAction implements Action {
    readonly type = Actions.LogOut;
}

export class SetTokenAction implements Action {
    readonly type = Actions.SetToken;

    constructor(public token: string) {}
}

export type AuthAction = SignUpAction | SignInAction | LogOutAction | SetTokenAction;