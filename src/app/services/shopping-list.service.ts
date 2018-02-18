import { Injectable } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppingListService {

  ingredientsChanged = new Subject<Array<Ingredient>>();
  startedEditing = new Subject<number>();

  constructor() { }

  private ingredients: Array<Ingredient> = [
    new Ingredient("Apples", 5),
    new Ingredient("Oranges", 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients());
  }

  addIngredients(ingredients: Array<Ingredient>) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients());
  }

}
