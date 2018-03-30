import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../ngrx/app.reducers';
import { TrySignUpAction } from '../../ngrx/auth.actions';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
})
export class SignUpComponent implements OnInit {

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
    }

    public onSignUp(form: NgForm) {
        this.store.dispatch(new TrySignUpAction(form.value.email, form.value.password));
    }

}
