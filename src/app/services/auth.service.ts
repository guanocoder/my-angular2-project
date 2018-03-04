import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

    constructor() { }

    signUp(email: string, password: string) : Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    signIn(email: string, password: string) : Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
}
