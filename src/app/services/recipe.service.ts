import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from 'app/recipes/recipe.model';
import { Ingredient } from 'app/shared/ingredient.model';
import { ShoppingListService } from 'app/services/shopping-list.service';

@Injectable()
export class RecipeService {

  public recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingList: ShoppingListService) { }

  private recipes: Array<Recipe> = [
    new Recipe(
      'A test recipe', 'This is only a test', 'https://www.cryingoverspiltmilk.co.nz/wp-content/uploads/2015/03/pixabay/b/recipe_1426460443.png',
      [
        new Ingredient("Eggs", 2),
        new Ingredient("Milk", 1),
      ]
    ),
    new Recipe('Recipe for Destruction', 'No idea where this came from', 'http://orig14.deviantart.net/7f56/f/2012/123/7/5/poetry_by_dyavoldesigns696-d4yecet.jpg',
      [
        new Ingredient("Granades", 10),
        new Ingredient("Rifles", 10),
      ]
    ),
  ];

  getRecipes() {
    return this.recipes.slice(); // copy of the array
  }

  addIngredientsToShoppingList(ingredients: Array<Ingredient>) {
    this.shoppingList.addIngredients(ingredients);
  }

}
