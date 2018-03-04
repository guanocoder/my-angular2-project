import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private recipeService: RecipeService) { }

    ngOnInit() {
    }

    onSaveData() {
        this.recipeService.saveRecipes().subscribe(result => {
            console.log(result);
            alert('done saving!');
        })
    }

    onLoadData() {
        this.recipeService.loadRecipes().subscribe(result => {
            console.log(result);
            alert('done loading!');
        })
    }

}
