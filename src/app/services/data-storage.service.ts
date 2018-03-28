import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Recipe } from '../recipes/recipe.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx/app.reducers';
import { AuthState } from '../ngrx/auth.reducers';

@Injectable()
export class DataStorageService {

    private authState: AuthState;

    constructor(private httpClient: HttpClient,
                private store: Store<AppState>) {
        this.store.select('auth').subscribe(authState => {
            this.authState = authState;
        })
    }

    storeRecipes(recipes: Array<Recipe>) {        
        return this.httpClient.put("https://my-angular2-project-dcc9b.firebaseio.com/recipes.json", recipes, { params: new HttpParams().set('auth', this.authState.token) })
    }

    loadRecipes(): Observable<Array<Recipe>> {
        return this.httpClient.get<Array<Recipe>>("https://my-angular2-project-dcc9b.firebaseio.com/recipes.json", { params: new HttpParams().set('auth', this.authState.token) })
            .map(recipes => {
                // because Firebase removes properties that are empty arrays
                recipes.forEach(recipe => {
                    if(!recipe.ingredients) {
                    recipe.ingredients = [];
                    }
                });
                return recipes;
            });
    }
}
