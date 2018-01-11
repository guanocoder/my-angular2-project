import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>();

  recipes: Array<Recipe> = [
    new Recipe('A test recipe', 'This is only a test', 'https://www.cryingoverspiltmilk.co.nz/wp-content/uploads/2015/03/pixabay/b/recipe_1426460443.png'),
    new Recipe('Recipe for Destruction', 'No idea where this came from', 'http://orig14.deviantart.net/7f56/f/2012/123/7/5/poetry_by_dyavoldesigns696-d4yecet.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

  select(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

}
