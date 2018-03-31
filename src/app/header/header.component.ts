import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable'

import { AppState } from '../ngrx/app.reducers';
import { AuthState } from '../ngrx/auth.reducers';
import { TryLogOutAction } from '../ngrx/auth.actions';
import { TrySaveRecipesAction, TryLoadRecipesAction } from '../ngrx/recipe.actions';
import { Recipe } from '../recipes/recipe.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

    public authState: Observable<AuthState>;
    public recipes: Recipe[];
   
    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
        this.store.select('recipes').subscribe(state => {
            this.recipes = state.recipes;
        })
    }

    public onSaveData() {
        this.store.dispatch(new TrySaveRecipesAction(this.recipes));
    }

    public onLoadData() {
        this.store.dispatch(new TryLoadRecipesAction());
    }

    public onLogout() {
        this.store.dispatch(new TryLogOutAction());
    }

}
