import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from 'app/recipes/recipe.model';
import { Ingredient } from 'app/shared/ingredient.model';
import { ShoppingListService } from 'app/services/shopping-list.service';
import { DataStorageService } from './data-storage.service';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Array<Recipe>>();

  constructor(private shoppingList: ShoppingListService,
              private storageService: DataStorageService) { }

  private recipes: Array<Recipe> = [
    new Recipe(
      'Pasta al Burro con Formaggino: Pasta with Butter and Cheese', "Rich and nutty Parmigano Reggiano needs little adornment; David Rocco simply dresses penne with Italian cream cheese, Parmigano and butter for an Italian take on an American favorite: macaroni and cheese.", 'https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2010/7/28/0/CCDRD118_pasta-al-burro_s4x3.jpg.rend.hgtvcom.966.773.suffix/1351614282348.jpeg',
      [
        new Ingredient("pound penne rigate pasta", 1),
        new Ingredient("cup freshly grated Parmigiano Reggiano cheese", .5),
        new Ingredient("tablespoons formaggino (Italian cream cheese)", 2),
        new Ingredient("tablespoons butter", 2),
        new Ingredient("Salt", 1),
      ],
    ),
    new Recipe(
      'Broccoli Rabe, Sausage and Pesto Pasta', "Most of the prep time in Laura Vitale's recipe comes from whipping together a broccoli rabe pesto, but the food processor does all the work for you.", 'https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2016/3/16/0/CCSPL204H_Broccoli-Rabe-Sausage-and-Pesto-Pasta_s4x3.jpg.rend.hgtvcom.966.725.suffix/1458157065036.jpeg',
      [
        new Ingredient("cup freshly grated Parmigiano-Reggiano, plus more for garnish ", .5),
        new Ingredient('cup extra-virgin olive oil ', .5),
        new Ingredient('cloves garlic', 2),
        new Ingredient('teaspoon lemon juice', 1),
        new Ingredient('cup toasted pine nuts, plus more for garnish ', 0.25),
        new Ingredient('cup loosely packed fresh parsley leaves', .5),
        new Ingredient('bunches broccoli rabe, tough stems and leaves discarded (about 8 ounces)', 2),
        new Ingredient('Kosher salt and freshly ground black pepper', 1),
      ],
    ),
    new Recipe(
      'Sausage and Radicchio Orecchiette', 'Gabriele Corcos and Debi Mazar have created a dish that’s sweet, a little spicy and incredibly refreshing — just like their marriage. The sharp notes of mint and red onion are soothed by the mild flavors of pasta and walnuts. The results are as bright and beautiful as the couple.', 'https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2012/2/22/0/CCEV103_Sausage-and-Radicchio-Orecchiette_s4x3.jpg.rend.hgtvcom.966.725.suffix/1416868863944.jpeg',
      [
        new Ingredient("tablespoons olive oil", 3),
        new Ingredient("red onion, chopped fine", .5),
        new Ingredient("handful fresh mint", 1),
        new Ingredient('fresh bay leaves', 2),
        new Ingredient('(6-ounce) pork sausage links, casings removed', 4),
        new Ingredient('cup dry white wine', .75),
        new Ingredient('handful walnuts, hand crushed', 1),
        new Ingredient('cups orecchiette', 2),
        new Ingredient('head radicchio, thinly sliced', .5),
        new Ingredient('Kosher salt and freshly ground black pepper', 1),
        new Ingredient('Freshly grated Parmesan cheese, for seasoning', 1),
      ],
    ),
    new Recipe("General Tso's Chicken", "While the Americanized version of this recipe typically calls for deep-fried chicken, Ching stir-fries her General Tso's chicken in a sweet and spicy sauce along with peanuts and scallions for a healthier (and more authentic) take on the recipe.", 'https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2011/9/13/0/EECB_p80-General-Tsos-Chicken_s3x4.jpg.rend.hgtvcom.966.1288.suffix/1358446988231.jpeg',
      [
        new Ingredient("pound boneless, skinless chicken breast, cut into 1-inch pieces", 1),
        new Ingredient("cup peanuts, toasted and chopped", 1),
        new Ingredient("whole dried Sichuan chilies", 4),
        new Ingredient('tablespoon vegetable oil', 1),
        new Ingredient('clove garlic, peeled, left whole and crushed', 1),
        new Ingredient('tablespoon Shaohsing rice wine or dry sherry', 1),
        new Ingredient('scallions, chopped', 2),
        new Ingredient('ounces egg noodles, cooked per package instructions', 8),
      ],
    ),
  ];

  getRecipes() {
    return this.recipes.slice(); // copy of the array
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Array<Ingredient>) {
    this.shoppingList.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }

  loadRecipes() {
    return this.storageService.loadRecipes().map(result => {
      this.recipes = result;
      let copy = this.getRecipes();
      this.recipesChanged.next(copy);
      return copy;
    });
  }

  saveRecipes() {
    return this.storageService.storeRecipes(this.getRecipes());
  }

}
