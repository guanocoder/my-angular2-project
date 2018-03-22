import { Action } from "@ngrx/store";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListAction, Actions } from "./shopping-list.actions";

export interface AppState {
    shoppingList: ShoppingListState;
}

export interface ShoppingListState {
    ingredients: Array<Ingredient>;
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
    ingredients: [
        new Ingredient("Apples", 5),
        new Ingredient("Oranges", 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

// function and not a _ => {} lambda expression because it won't work (says the german boy)
export function shoppingListReducer(state: ShoppingListState = initialState, action: ShoppingListAction): ShoppingListState {
    switch(action.type) {
        case Actions.AddIngredient: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        }
        case Actions.AddMultipleIngredients: {
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        }
        case Actions.UpdateIngredient: {
            state.ingredients.splice(state.editedIngredientIndex, 1, action.payload);
            return {
                ...state,
                ingredients: state.ingredients,
            }
        }
        case Actions.DeleteIngredient: {
            state.ingredients.splice(state.editedIngredientIndex, 1);
            return {
                ...state,
                ingredients: state.ingredients,
            }
        }
        case Actions.StartEditingIngredient: {
            return {
                ...state,
                editedIngredientIndex: action.payload.index,
                editedIngredient: state.ingredients[action.payload.index],
            }
        }
        default:
            return state;
    }
}