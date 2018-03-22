import { Action } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';

export enum Actions {
    AddIngredient = "ADD_INGREDIENT",
    AddMultipleIngredients = "ADD_MULTIPLE_INGREDIENTS",
    UpdateIngredient = "UPDATE_INGREDIENT",
    DeleteIngredient = "DELETE_INGREDIENT",
    StartEditingIngredient = "START_EDITING_INGREDIENT",
}

export class AddIngredientAction implements Action {
    readonly type = Actions.AddIngredient;
    
    constructor(public payload: Ingredient) {}
}

export class AddMultipleIngredientsAction implements Action {
    readonly type = Actions.AddMultipleIngredients;

    constructor(public payload: Array<Ingredient>) {}
}

export class UpdateIngredientAction implements Action {
    readonly type = Actions.UpdateIngredient;

    constructor(public payload: Ingredient) {}
}

export class DeleteIngredientAction implements Action {
    readonly type = Actions.DeleteIngredient;
}

export class StartEditingIngredientAction implements Action {
    readonly type = Actions.StartEditingIngredient;

    constructor(public payload: {index: number}) {}
}

export type ShoppingListAction = AddIngredientAction | AddMultipleIngredientsAction | UpdateIngredientAction | DeleteIngredientAction | StartEditingIngredientAction;

