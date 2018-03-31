import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { RecipeActions, LoadedRecipesAction, TrySaveRecipesAction, SavedRecipesAction, RecipeAction } from "./recipe.actions";
import { DataStorageService } from "../services/data-storage.service";
import { Store } from "@ngrx/store";
import { AppState } from "./app.reducers";
import { RecipeState } from "./recipe.reducers";

@Injectable()
export class RecipeEffects {
    @Effect()
    loadRecipes = this.actionsObservable
        .ofType(RecipeActions.TryLoadRecipes)
        .switchMap(_ => {
            return this.storageService.loadRecipes();            
         })
        .map(recipes => new LoadedRecipesAction(recipes))

    @Effect()
    saveRecipes = this.actionsObservable
        .ofType(RecipeActions.TrySaveRecipes)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([action, state] : [TrySaveRecipesAction, RecipeState]) => {
            return this.storageService.storeRecipes(state.recipes);
        })
        .map(_ => new SavedRecipesAction());

    constructor(private actionsObservable: Actions,
                private storageService: DataStorageService,
                private store: Store<AppState>) {}


}