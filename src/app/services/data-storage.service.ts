import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {

    constructor(private http: Http) {}

    storeRecipes(recipes: Array<Recipe>) {
        return this.http.put("https://my-angular2-project-dcc9b.firebaseio.com/recipes.json", recipes);
    }

    loadRecipes(): Observable<Array<Recipe>> {
        return this.http.get("https://my-angular2-project-dcc9b.firebaseio.com/recipes.json")
            .map(response => {
                return response.json();
            });
    }
}
