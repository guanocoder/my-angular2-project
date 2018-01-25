import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from 'app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild("nameInput") nameInput: ElementRef;
  @ViewChild("amountInput") amountInput: ElementRef;

  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit() {
  }

  addClick() {
    this.shoppingList.addIngredient(new Ingredient(
      this.nameInput.nativeElement.value,
      Number(this.amountInput.nativeElement.value)
    ));
    // return false so that submit button doesn't reload the whole thing
    return false;
  }

}
