import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable'

import { RecipeService } from '../services/recipe.service';
import { AppState } from '../ngrx/app.reducers';
import { AuthState } from '../ngrx/auth.reducers';
import { TryLogOutAction } from '../ngrx/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

    public authState: Observable<AuthState>;
   
    constructor(private recipeService: RecipeService,
                private store: Store<AppState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    public onSaveData() {
        this.recipeService.saveRecipes().subscribe(result => {
            console.log('done saving!', result);
        }, error => {
            console.log("Error while saving data to firebase", error);
        })
    }

    public onLoadData() {
        this.recipeService.loadRecipes().subscribe(result => {
            console.log('done loading!', result);
        }, error => {
            console.log("Error while loading data from firebase", error);
        })
    }

    public onLogout() {
        this.store.dispatch(new TryLogOutAction());
    }

}
