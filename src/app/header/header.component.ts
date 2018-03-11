import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private recipeService: RecipeService,
                public authService: AuthService) { }

    ngOnInit() {
    }

    onSaveData() {
        this.recipeService.saveRecipes().subscribe(result => {
            console.log('done saving!', result);
        }, error => {
            console.log("Error while saving data to firebase", error);
        })
    }

    onLoadData() {
        this.recipeService.loadRecipes().subscribe(result => {
            console.log('done loading!', result);
        }, error => {
            console.log("Error while loading data from firebase", error);
        })
    }

    onLogout() {
        this.authService.logout().then(result => {
            console.log("successfully logged out", result);
        }).catch(error => {
            console.log("error during logout", error);
        });
    }

}
