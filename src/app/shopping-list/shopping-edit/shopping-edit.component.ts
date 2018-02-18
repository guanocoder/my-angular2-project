import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from 'app/services/shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    this.shoppingList.addIngredient(new Ingredient(
      value.name,
      value.amount
    ));
  }

}
