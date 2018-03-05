import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Recipe } from '../recipes/recipe.model';
import { AuthService } from './auth.service';

@Injectable()
export class DataStorageService {

    constructor(private http: Http,
                private authService: AuthService) {}

    storeRecipes(recipes: Array<Recipe>) {
        return Observable.from(this.authService.getToken()).flatMap(token => {
            return this.http.put("https://my-angular2-project-dcc9b.firebaseio.com/recipes.json", recipes, { params: { auth: token }});
        });
    }

    loadRecipes(): Observable<Array<Recipe>> {
        return Observable.from(this.authService.getToken()).flatMap(token => {
            return this.http.get("https://my-angular2-project-dcc9b.firebaseio.com/recipes.json", { params: { auth: token }})
                .map(response => {
                    return response.json();
                })
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
