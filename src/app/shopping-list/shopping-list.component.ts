import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { Ingredient } from "./../shared/ingredient.model";
// import { ShoppingListService } from "./shopping-list.service"; //Comment since we use the store and state
import { Component, OnDestroy, OnInit } from "@angular/core";
import * as ShoppingAction from "./store/shopping-list.actions";
import * as fromAppState from "../store/app.reducer";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  isEdit: boolean = false;
  //private subsIngredientChanged:Subscription;
  constructor(
    // private shoppingListSrv: ShoppingListService,//Comment since we use the store and state
    private store: Store<fromAppState.AppState>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
  }
  onSelectedIngredient(idx: number) {
    this.store.dispatch(new ShoppingAction.StartEdit(idx));
  }

  ngOnDestroy() {}
}
