import { ActionReducerMap } from "@ngrx/store";
import { ShoppingListState, shoppingListReducer } from "./shopping-list.reducers";
import { AuthState, authReducer } from "./auth.reducers";
import { RecipeState, recipeReducer } from "./recipe.reducers";

export interface AppState {
    shoppingList: ShoppingListState;
    auth: AuthState;
    recipes: RecipeState;
}

export const appReducers: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer,
    auth: authReducer,
    recipes: recipeReducer,
}