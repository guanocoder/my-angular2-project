import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from "../recipe.model";
import { Subscription } from 'rxjs/Subscription';
import { AppState } from '../../ngrx/app.reducers';
import { SelectRecipeAction } from '../../ngrx/recipe.actions';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {

  public recipes: Array<Recipe> = [];
  subscription: Subscription;
  
  constructor(private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.store.select('recipes').subscribe(state => {
      this.recipes = state.recipes;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }  

  addNewClick() {
    this.store.dispatch(new SelectRecipeAction(-1)); // If index is less than 0 then reducer is going to select an empty recipe as selected
    this.router.navigate(["new"], { relativeTo: this.route});
  }
}
