import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../ngrx/app.reducers';
import { TrySignInAction } from '../../ngrx/auth.actions';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
    }

    onSignIn(form: NgForm) {
        this.store.dispatch(new TrySignInAction(form.value.email, form.value.password));
    }

}
