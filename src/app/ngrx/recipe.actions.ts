import { Action } from '@ngrx/store';
import { Recipe } from '../recipes/recipe.model';

export enum RecipeActions {
    AddRecipe = "ADD_RECIPE",
    EditRecipe = "EDIT_RECIPE",
    DeleteRecipe = "DELETE_RECIPE",
    TryLoadRecipes = "TRY_LOAD_RECIPES",
    LoadedRecipes = "LOADED_RECIPES",
    TrySaveRecipes = "TRY_SAVE_RECIPES",
    SavedRecipes = "SAVED_RECIPES",
    SelectRecipe = "SELECT_RECIPE",
}

export class AddRecipeAction implements Action {
    readonly type = RecipeActions.AddRecipe;
    constructor(public recipe: Recipe) {}
}

export class EditRecipeAction implements Action {
    readonly type = RecipeActions.EditRecipe;
    constructor(public index: number,
                public recipe: Recipe) {}
}

export class DeleteRecipeAction implements Action {
    readonly type = RecipeActions.DeleteRecipe;
    constructor(public index: number) {}
}

export class TryLoadRecipesAction implements Action {
    readonly type = RecipeActions.TryLoadRecipes;
}

export class LoadedRecipesAction implements Action {
    readonly type = RecipeActions.LoadedRecipes;
    constructor(public recipes: Array<Recipe>) {}
}

export class TrySaveRecipesAction implements Action {
    readonly type = RecipeActions.TrySaveRecipes;
    constructor(public recipes: Array<Recipe>) {}
}

export class SavedRecipesAction implements Action {
    readonly type = RecipeActions.SavedRecipes;
}

export class SelectRecipeAction implements Action {
    readonly type = RecipeActions.SelectRecipe
    constructor(public index: number) {}
}

export type RecipeAction = AddRecipeAction | EditRecipeAction | DeleteRecipeAction | LoadedRecipesAction | SavedRecipesAction | SelectRecipeAction;