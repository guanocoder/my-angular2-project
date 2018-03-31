import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../ngrx/app.reducers';
import { TrySignUpAction } from '../../ngrx/auth.actions';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
})
export class SignUpComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    public errorMessage: string;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.subscription = this.store.select('auth').subscribe(authState => {
            this.errorMessage = authState.errorMessage;
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public onSignUp(form: NgForm) {
        this.store.dispatch(new TrySignUpAction(form.value.email, form.value.password));
    }

}
