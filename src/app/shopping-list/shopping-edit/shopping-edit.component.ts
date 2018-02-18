import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from 'app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('editForm') editForm: NgForm;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  private subscription: Subscription;

  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingList.startedEditing.subscribe(index => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingList.getIngredient(index);
      this.editForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    let ingredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.shoppingList.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingList.addIngredient(ingredient);
    }
    this.resetForm();
  }

  deleteItem() {
    this.shoppingList.removeIngredient(this.editedItemIndex);
    this.resetForm()
  }  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  resetForm() {
    this.editMode = false;
    this.editForm.reset();
  }
}
