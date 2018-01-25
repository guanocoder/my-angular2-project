import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient.model';

@Injectable()
export class ShoppingListService {

  ingredientsChanged = new EventEmitter<Array<Ingredient>>();

  constructor() { }

  private ingredients: Array<Ingredient> = [
    new Ingredient("Apples", 5),
    new Ingredient("Oranges", 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredients());
  }

  addIngredients(ingredients: Array<Ingredient>) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.getIngredients());
  }

}
