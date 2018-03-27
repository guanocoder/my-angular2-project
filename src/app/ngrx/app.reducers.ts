import { ActionReducerMap } from "@ngrx/store";
import { ShoppingListState, shoppingListReducer } from "./shopping-list.reducers";
import { AuthState, authReducer } from "./auth.reducers";

export interface AppState {
    shoppingList: ShoppingListState;
    auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    shoppingList: shoppingListReducer,
    auth: authReducer
}