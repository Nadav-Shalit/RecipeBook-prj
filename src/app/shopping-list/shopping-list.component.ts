import { LoggingService } from './../logging.service';
import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit,OnDestroy {
   ingredients: Ingredient[] = [];
   isEdit:boolean = false;
   private subsIngredientChanged:Subscription;
  constructor(private shoppingListSrv:ShoppingListService,
    private logSrv:LoggingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListSrv.fetch();
    this.subsIngredientChanged= this.shoppingListSrv.ingredientChanged
    .subscribe((ingredients:Ingredient[]) => {this.ingredients= ingredients;});
    this.logSrv.printLog('ShoppingListComponent ngOnInit:25');
  }
  onSelectedIngredient(idx:number){
     this.shoppingListSrv.selectedIngredientIndex.next(idx);
  }

  ngOnDestroy(){
    if(this.subsIngredientChanged) {
      this.subsIngredientChanged.unsubscribe();
    }
  }
  
}
