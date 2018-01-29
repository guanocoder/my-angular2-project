import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from 'app/recipes/recipes.component';
import { ShoppingListComponent } from 'app/shopping-list/shopping-list.component';
import { RecipeHomeComponent } from 'app/recipes/recipe-home/recipe-home.component';
import { RecipeDetailComponent } from 'app/recipes/recipe-detail/recipe-detail.component';

const routes: Routes = [
    {
        path: 'recipes',
        component: RecipesComponent,
        children: [
            {
                path: '',
                component: RecipeHomeComponent
            }, 
            {
                path: ':id',
                component: RecipeDetailComponent
            },
        ]
    },
    {
        path: 'shopping-list',
        component: ShoppingListComponent
    },
    {
        path: '**',
        redirectTo: '/recipes',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
})
export class RoutingModule { }
