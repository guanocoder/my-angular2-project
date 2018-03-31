import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
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
            return firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
        }).switchMap(_ => {
            return firebase.auth().currentUser.getToken()
        }).mergeMap(token => {
            return [
                new SignUpAction(),
                new SetTokenAction(token)
            ]
        }).do(_ => {
            this.router.navigate(["/"]);
        });

    @Effect()
    authSignIn = this.actionsObservable
        .ofType(AuthActions.TrySignIn)
        // Once error occurs in the observer chain
        // the whole f*cking thing stops working (unsubscribes)
        // hence the following piece of crap with piping and strange shit
        .pipe(
            map((action: TrySignInAction) => {
                return {
                    email: action.email,
                    password: action.password
                }
            }),
            switchMap(credentials => {
                return Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(_ => {
                    return firebase.auth().currentUser.getToken();
                })).pipe(
                    mergeMap((token: string) => {
                        this.router.navigate(["/"]);
                        return [
                            new SignInAction(),
                            new SetTokenAction(token)
                        ]
                    }),
                    catchError(error => {
                        return Observable.of(new ErrorOnSignInAction(error.message));
                    })
                );
            })
        );
    
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