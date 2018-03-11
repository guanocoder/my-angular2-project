import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Recipe } from '../recipes/recipe.model';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class DataStorageService {

    constructor(private httpClient: HttpClient,
                private authService: AuthService) {}

    storeRecipes(recipes: Array<Recipe>) {
        return Observable.from(this.authService.getToken()).flatMap(token => {
            return this.httpClient.put("https://my-angular2-project-dcc9b.firebaseio.com/recipes.json", recipes, { params: new HttpParams().set('auth', token) });
        });
    }

    loadRecipes(): Observable<Array<Recipe>> {
        return Observable.from(this.authService.getToken()).flatMap(token => {
            return this.httpClient.get<Array<Recipe>>("https://my-angular2-project-dcc9b.firebaseio.com/recipes.json", { params: new HttpParams().set('auth', token) })
                .map(recipes => {
                    // because Firebase removes properties that are empty arrays
                    recipes.forEach(recipe => {
                        if(!recipe.ingredients) {
                        recipe.ingredients = [];
                        }
                    });
                    return recipes;
                });
        });
    }
}
