import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Ingredient } from "../shared/ingredient.model";
import { AppState } from '../ngrx/shopping-list.reducers';
import { StartEditingIngredientAction } from '../ngrx/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {

  state: Observable<{ingredients: Array<Ingredient>}>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.state = this.store.select('shoppingList');
  }

  onClick(index: number) {
    this.store.dispatch(new StartEditingIngredientAction({ index: index }));
  }

}
