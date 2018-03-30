import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model'
import { AddIngredientAction, DeleteIngredientAction, UpdateIngredientAction } from '../../ngrx/shopping-list.actions';
import { AppState } from '../../ngrx/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('editForm') public editForm: NgForm;
  public editMode = false;
  private editedItem: Ingredient;
  private subscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      /// ----------- I was getting the following error: ------------------------------------
      /// ShoppingListComponent.html:6 ERROR Error: 
      //  There are no form controls registered with this group yet.  If you're using ngModel,
      //  you may want to check next tick (e.g. use setTimeout).
      //  ------------------------------------------------------------------------------------
      //  I guess the problem is that I am using NgForm instead of reactive Forms with rxjs
      //  the workaround is the .delay(0) that should execute the following code in the next
      //  angular tick
      .delay(0)
      .subscribe(state => {
        if(state.editedIngredientIndex > -1) {          
          this.editMode = true;
          this.editedItem = state.editedIngredient;
          this.editForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        } else {
          this.editMode = false;
        }
      });
  }

  public onSubmit(form: NgForm) {
    const value = form.value;
    let ingredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.store.dispatch(new UpdateIngredientAction(ingredient));
    } else {
      this.store.dispatch(new AddIngredientAction(ingredient));
    }
    this.resetForm();
  }

  public deleteItem() {
    this.store.dispatch(new DeleteIngredientAction());
    this.resetForm()
  }  

  ngOnDestroy() {
    this.subscription.unsubscribe();    
  }

  public resetForm() {
    this.editMode = false;
    this.editForm.reset();
  }
}
