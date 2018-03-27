import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from "../recipe.model";
import { RecipeService } from 'app/services/recipe.service';
import { Ingredient } from '../../shared/ingredient.model';
import { AddMultipleIngredientsAction } from '../../ngrx/shopping-list.actions';
import { AppState } from '../../ngrx/app.reducers';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    @Input() recipe: Recipe;
    id: number;

    constructor(private recipeService: RecipeService,
                private route: ActivatedRoute,
                private router: Router,
                private store: Store<AppState>) { }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = +params["id"];
            this.recipe = this.recipeService.getRecipe(this.id);
        })
    }

    addIngredientsToShoppingList() {
        this.store.dispatch(new AddMultipleIngredientsAction(this.recipe.ingredients));
    }

    deleteRecipe() {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    // Event not used because "routerLink" directive was preferred
    onEditRecipe() {
        this.router.navigate(['edit'], { relativeTo: this.route });
        // this.router.navigate(['..',this.id,'edit'], { relativeTo: this.route });
    }

}
