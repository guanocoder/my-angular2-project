import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from "../recipe.model";
import { Ingredient } from '../../shared/ingredient.model';
import { AddMultipleIngredientsAction } from '../../ngrx/shopping-list.actions';
import { AppState } from '../../ngrx/app.reducers';
import { SelectRecipeAction, DeleteRecipeAction } from '../../ngrx/recipe.actions';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    @Input() public recipe: Recipe = new Recipe('','','',[]);
    id: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private store: Store<AppState>) { }

    ngOnInit() {
        this.store.select('recipes').subscribe(state => {
            this.id = state.selectedRecipeIndex;
            this.recipe = state.selectedRecipe;
        });
        this.route.params.subscribe((params: Params) => {
            this.id = +params["id"];
            this.store.dispatch(new SelectRecipeAction(this.id));
        })
    }

    public addIngredientsToShoppingList() {
        this.store.dispatch(new AddMultipleIngredientsAction(this.recipe.ingredients));
    }

    public deleteRecipe() {
        this.store.dispatch(new DeleteRecipeAction(this.id));
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    // Event not used because "routerLink" directive was preferred
    public onEditRecipe() {
        this.router.navigate(['edit'], { relativeTo: this.route });
        // this.router.navigate(['..',this.id,'edit'], { relativeTo: this.route });
    }

}
