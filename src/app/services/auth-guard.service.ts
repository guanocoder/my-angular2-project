import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppState } from '../ngrx/app.reducers';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private store: Store<AppState>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth').map(authState => authState.isAuthenticated);
    }

}
