import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

import { RecipeService } from 'app/services/recipe.service';
import { Recipe } from 'app/recipes/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: [`
    img {
      max-height: 300px;
    }
  `]
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipe: Recipe;

    if(this.editMode) {
      recipe = this.recipeService.getRecipe(this.id);
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name),
      'imagePath': new FormControl(recipe.imagePath),
      'description': new FormControl(recipe.description),
      'ingredients': new FormArray(
        recipe.ingredients.map(ingredient => new FormGroup({
          'name': new FormControl(ingredient.name),
          'amount': new FormControl(ingredient.amount)
        }))
      )
    });

    console.log("initialized form:", this.recipeForm);
  
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

}
