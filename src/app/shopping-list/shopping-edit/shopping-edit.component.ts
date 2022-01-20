import { BehaviorSubject, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
//import { ShoppingListService } from "./../shopping-list.service";//Comment since we use the store and state
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";

import { Ingredient } from "../../shared/ingredient.model";
import { FormGroup } from "@angular/forms";
import * as ShoppingListActions from "../store/shopping-list.actions";
import * as fromAppState from "../../store/app.reducer";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("frmIngredient", { static: false }) frmIngredient: FormGroup;
  selectedIngredientIndex: number = -1;
  subscriptionParam: Subscription;
  ingredients$ = new BehaviorSubject<Ingredient[]>([]);

  constructor(
    // private shoppingListSrv: ShoppingListService,//Comment since we use the store and state
    private store: Store<fromAppState.AppState>
  ) {}

  ngOnInit() {
    this.store.select("shoppingList").subscribe((stateData) => {
      this.ingredients$.next(stateData.ingredients);
    });

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
      this.store.dispatch(
        new ShoppingListActions.AddIngredient(new Ingredient(name, amount))
      );
    } else {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          ingredient: new Ingredient(name, amount),
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
  }
  onClearAll() {
    if (confirm("Are you sure to delete all ingrediernts?")) {
      this.frmIngredient.reset();
      this.store.dispatch(new ShoppingListActions.ClearIngredients());
    }
  }
  ingredientsCount() {
    return this.ingredients$ ? this.ingredients$.value.length : 0;
  }
}
