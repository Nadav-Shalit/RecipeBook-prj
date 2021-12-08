import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { ShoppingListService } from "./../shopping-list.service";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { Ingredient } from "../../shared/ingredient.model";
import { FormGroup } from "@angular/forms";
import * as ShoppingListActions from "../store/shopping-list.actions";
import * as fromShppingList from "../store/shopping-list.reducer";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("frmIngredient", { static: false }) frmIngredient: FormGroup;
  selectedIngredientIndex: number = -1;
  subscriptionParam: Subscription;
  constructor(
    private shoppingListSrv: ShoppingListService,
    private store: Store<fromShppingList.AppState>
  ) {}

  ngOnInit() {
    this.subscriptionParam = this.store
      .select("shoppingList")
      .subscribe((stateData) => {
        this.selectedIngredientIndex = stateData.selectedIndex;
        const curIngredient: Ingredient = stateData.curIngredient;
        if (curIngredient) {
          this.frmIngredient.setValue({
            name: curIngredient.name,
            amount: curIngredient.amount,
          });
        }
      });
  }
  ngOnDestroy() {
    this.subscriptionParam.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onAddItem() {
    console.log("form", this.frmIngredient.value);
    const name = this.frmIngredient.value.name;
    const amount = this.frmIngredient.value.amount;
    if (this.selectedIngredientIndex === -1) {
      const newIngredient = new Ingredient(name, amount);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    } else {
      const curIngredient: Ingredient = this.shoppingListSrv.fetchByIndex(
        this.selectedIngredientIndex
      );
      curIngredient.name = name;
      curIngredient.amount = amount;
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          ingredient: curIngredient,
        })
      );
    }
    this.onClear();
  }
  onSelectedIngredient(idx: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(idx));
  }
  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }
  onClear() {
    this.frmIngredient.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
    //this.selectedIngredientIndex=-1;
  }
  onClearAll() {
    if (confirm("Are you sure to delete all ingrediernts?")) {
      this.frmIngredient.reset();
      this.store.dispatch(new ShoppingListActions.ClearIngredients());
    }
    //this.selectedIngredientIndex=-1;
  }
}
