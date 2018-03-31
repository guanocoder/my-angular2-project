import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../ngrx/app.reducers';
import { TrySignInAction } from '../../ngrx/auth.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
})
export class SignInComponent implements OnInit, OnDestroy {

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

    public onSignIn(form: NgForm) {
        this.store.dispatch(new TrySignInAction(form.value.email, form.value.password));
    }

}
