import { Actions } from "./store/shopping-list.actions";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { LoggingService } from "./../logging.service";
import { Ingredient } from "./../shared/ingredient.model";
// import { ShoppingListService } from "./shopping-list.service"; //Comment since we use the store and state
import { Component, OnDestroy, OnInit } from "@angular/core";
import * as ShoppingAction from "./store/shopping-list.actions";
import * as fromShppingList from "./store/shopping-list.reducer";

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
    private logSrv: LoggingService,
    private store: Store<fromShppingList.AppState>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
    console.log("line 29", this.ingredients);
  }
  onSelectedIngredient(idx: number) {
    this.store.dispatch(new ShoppingAction.StartEdit(idx));
  }

  ngOnDestroy() {}
}
