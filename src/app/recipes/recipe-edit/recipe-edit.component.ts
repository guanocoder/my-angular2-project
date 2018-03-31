import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Recipe } from 'app/recipes/recipe.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../ngrx/app.reducers';
import { EditRecipeAction, SelectRecipeAction, AddRecipeAction } from '../../ngrx/recipe.actions';
import { Subscription } from 'rxjs';

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
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode = false;
  public recipeForm: FormGroup;
  private subscriptionRecipes: Subscription;

  private selectedRecipe: Recipe = new Recipe('','','',[]);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.subscriptionRecipes = this.store.select('recipes').subscribe(state => {
      if(state.selectedRecipe != null) {
        this.id = state.selectedRecipeIndex;
        this.selectedRecipe = state.selectedRecipe;
      }
    });
    this.route.params.subscribe((params: Params) => {
      this.store.dispatch(new SelectRecipeAction(this.id));
      this.id = +params["id"];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngOnDestroy() {
    this.subscriptionRecipes.unsubscribe();
  }

  private initForm() {
    if(this.selectedRecipe == null) debugger;

    this.recipeForm = new FormGroup({
      'name': new FormControl(this.selectedRecipe.name, Validators.required),
      'imagePath': new FormControl(this.selectedRecipe.imagePath, Validators.required),
      'description': new FormControl(this.selectedRecipe.description, Validators.required),
      'ingredients': new FormArray(
        this.selectedRecipe.ingredients.map(ingredient => this.yieldIngredientFormGroup(ingredient.name, ingredient.amount))
      )
    });
 
  }

  public getFormIngredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  public onSubmit() {
    if(this.editMode) {
      this.store.dispatch(new EditRecipeAction(this.id, this.recipeForm.value));
    } else {
      this.store.dispatch(new AddRecipeAction(this.recipeForm.value));
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.yieldIngredientFormGroup());
  }

  public onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private yieldIngredientFormGroup(name: string = "", amount: number = 1): FormGroup {
    return new FormGroup({
      'name': new FormControl(name, Validators.required),
      'amount': new FormControl(amount, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]),
    });
  }

}
