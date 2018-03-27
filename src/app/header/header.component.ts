import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable'

import { RecipeService } from '../services/recipe.service';
import { AuthService } from '../services/auth.service';
import { AppState } from '../ngrx/app.reducers';
import { AuthState } from '../ngrx/auth.reducers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    authState: Observable<AuthState>;
   
    constructor(private recipeService: RecipeService,
                public authService: AuthService,
                private store: Store<AppState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSaveData() {
        this.recipeService.saveRecipes().subscribe(result => {
            console.log('done saving!', result);
        }, error => {
            console.log("Error while saving data to firebase", error);
        })
    }

    onLoadData() {
        this.recipeService.loadRecipes().subscribe(result => {
            console.log('done loading!', result);
        }, error => {
            console.log("Error while loading data from firebase", error);
        })
    }

    onLogout() {
        this.authService.logout().then(result => {
            console.log("successfully logged out", result);
        }).catch(error => {
            console.log("error during logout", error);
        });
    }

}
