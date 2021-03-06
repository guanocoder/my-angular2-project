import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from 'app/recipes/recipes.component';
import { ShoppingListComponent } from 'app/shopping-list/shopping-list.component';
import { RecipeHomeComponent } from 'app/recipes/recipe-home/recipe-home.component';
import { RecipeDetailComponent } from 'app/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from 'app/recipes/recipe-edit/recipe-edit.component';
import { SignUpComponent } from '../auth/signup/signup.component';
import { SignInComponent } from '../auth/signin/signin.component';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeHomeComponent }, 
        { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService] },
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService] }
    ]},
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'signin', component: SignInComponent },
    { path: '**', redirectTo: '/recipes' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
})
export class RoutingModule { }
