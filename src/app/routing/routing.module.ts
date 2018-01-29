import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from 'app/recipes/recipes.component';
import { ShoppingListComponent } from 'app/shopping-list/shopping-list.component';

const routes: Routes = [
    {
        path: 'recipes',
        component: RecipesComponent
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
