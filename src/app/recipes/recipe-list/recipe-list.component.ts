import { Component, OnInit } from '@angular/core';
import { Recipe } from "../recipe.model";
import { RecipeService } from 'app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Array<Recipe> = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.recipeService.recipesChanged.subscribe(recipes => {
      this.recipes = recipes;
    })
  }

}
