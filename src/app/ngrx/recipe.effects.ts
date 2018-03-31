import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { RecipeActions, LoadedRecipesAction, TrySaveRecipesAction, SavedRecipesAction, RecipeAction } from "./recipe.actions";
import { DataStorageService } from "../services/data-storage.service";

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
        .switchMap((action: TrySaveRecipesAction) => {
            return this.storageService.storeRecipes(action.recipes);
        })
        .map(_ => new SavedRecipesAction());

    constructor(private actionsObservable: Actions,
                private storageService: DataStorageService) {}


}