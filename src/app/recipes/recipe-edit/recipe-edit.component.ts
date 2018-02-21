import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from 'app/services/recipe.service';
import { Recipe } from 'app/recipes/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: [`
    img {
      max-height: 300px;
    }
    input.ng-invalid.ng-touched,
    textarea.ng-invalid.ng-touched {
      border: 1px solid red;
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
    let recipe: Recipe = new Recipe('','','',[]);

    if(this.editMode) {
      recipe = this.recipeService.getRecipe(this.id);
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'description': new FormControl(recipe.description, Validators.required),
      'ingredients': new FormArray(
        recipe.ingredients.map(ingredient => this.yieldIngredientFormGroup(ingredient.name, ingredient.amount))
      )
    });

    console.log("initialized form:", this.recipeForm);
  
  }

  onSubmit() {
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.yieldIngredientFormGroup());
  }


  private yieldIngredientFormGroup(name: string = "", amount: number = 1): FormGroup {
    return new FormGroup({
      'name': new FormControl(name, Validators.required),
      'amount': new FormControl(amount, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]),
    });
  }

}
