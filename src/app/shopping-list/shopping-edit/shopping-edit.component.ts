import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild("nameInput") nameInput: ElementRef;
  @ViewChild("amountInput") amountInput: ElementRef;

  @Output("ingredientAdded") ingredientAddEmitter = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  addClick() {
    this.ingredientAddEmitter.emit(new Ingredient(
      this.nameInput.nativeElement.value,
      Number(this.amountInput.nativeElement.value)
    ));
    // return false so that submit button doesn't reload the whole thing
    return false;
  }

}
