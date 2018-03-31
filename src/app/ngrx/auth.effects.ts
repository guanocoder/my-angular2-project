import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthActions, TrySignUpAction, TrySignInAction, SignUpAction, SetTokenAction, SignInAction, LogOutAction, ErrorOnSignInAction } from './auth.actions';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignUp = this.actionsObservable
        .ofType(AuthActions.TrySignUp)
        .map((action: TrySignUpAction) => {
            return {
                email: action.email,
                password: action.password
            }
        }).switchMap(credentials => {
            return Observable.fromPromise(firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)).switchMap(_ => {
                return firebase.auth().currentUser.getToken();
            }).mergeMap(token => {
                return [
                    new SignUpAction(),
                    new SetTokenAction(token)
                ]
            }).catch(error => {
                return [
                    new ErrorOnSignInAction(error.message)
                ]
            });
        }).do(action => {
            if(action instanceof SetTokenAction)
                this.router.navigate(["/"]);
        });

    @Effect()
    authSignIn = this.actionsObservable
        .ofType(AuthActions.TrySignIn)
        .map((action: TrySignInAction) => {
            return {
                email: action.email,
                password: action.password
            }
        }).switchMap(credentials => {
            return Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)).switchMap(_ => {
                return firebase.auth().currentUser.getToken();
            }).mergeMap(token => {
                return [
                    new SignInAction(),
                    new SetTokenAction(token)
                ];
            }).catch(error => {
                return [
                    new ErrorOnSignInAction(error.message)
                ]
            });
        }).do(action => {
            if(action instanceof SetTokenAction)
                this.router.navigate(["/"]);
        });
    
    @Effect()
    authLogOut = this.actionsObservable
        .ofType(AuthActions.TryLogOut)
        .map((action: LogOutAction) => {
            return firebase.auth().signOut();
        }).switchMap(_ => {
            return [
                new LogOutAction()
            ]
        }).do(_ => {
            this.router.navigate(["/"]);
        });

    constructor(private actionsObservable: Actions,
                private router: Router) {

    }
}