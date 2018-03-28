import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import { AppState } from '../ngrx/app.reducers';
import { SignInAction, SignUpAction, LogOutAction, SetTokenAction } from '../ngrx/auth.actions';

@Injectable()
export class AuthService {

    constructor(private store: Store<AppState>) { }

    signUp(email: string, password: string) : Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
            this.store.dispatch(new SignUpAction());
            return this.getToken().then(token => {
                this.store.dispatch(new SetTokenAction(token));
            }).then(_ => user);
        });
    }

    signIn(email: string, password: string) : Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
            this.store.dispatch(new SignInAction());
            return this.getToken().then(token => {
                this.store.dispatch(new SetTokenAction(token));
            }).then(_ => user);
        });
    }

    getToken(): Promise<string> {
        if(firebase.auth().currentUser)
            return firebase.auth().currentUser.getToken();
        else
            return Promise.reject("User not authorized!");
    }

    isAuthenticated(): boolean  {
        return firebase.auth().currentUser != null;
    }

    logout() {
        return firebase.auth().signOut().then(_ => {
            this.store.dispatch(new LogOutAction());
            return _;
        });
    }
}
