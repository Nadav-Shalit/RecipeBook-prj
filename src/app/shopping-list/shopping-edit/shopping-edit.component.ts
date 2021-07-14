import { Subscription } from 'rxjs/Subscription';
import { ShoppingListService } from './../shopping-list.service';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('frmIngredient',{static:false}) frmIngredient:FormGroup;
  selectedIngredientIndex:number = -1; 
  subscriptionParam:Subscription;
  constructor(private shoppingListSrv:ShoppingListService) { }

  ngOnInit() {
     this.subscriptionParam = this.shoppingListSrv.selectedIngredientIndex
         .subscribe(
           (idx:number) => {
           const curIngredient:Ingredient = this.shoppingListSrv.fetchByIndex(idx);
           this.selectedIngredientIndex = idx; 
           this.frmIngredient.setValue(
             {
               'name' :curIngredient.name,
              'amount':curIngredient.amount
              }
             )        
          });
  }
  ngOnDestroy(){
    this.subscriptionParam.unsubscribe();
  }
  onAddItem() {
    console.log('form',this.frmIngredient);
    const name = this.frmIngredient.value.name;
    const amount = this.frmIngredient.value.amount;
    if(this.selectedIngredientIndex ===-1) {
      const newIngredient = new Ingredient(name, amount);
      this.shoppingListSrv.addIngredient(newIngredient);
    } else {
      const curIngredient:Ingredient = this.shoppingListSrv.fetchByIndex(this.selectedIngredientIndex);
      curIngredient.name = name;
      curIngredient.amount = amount;
    }
    this.onClear();
  }
  onSelectedIngredient(idx:number){
    this.shoppingListSrv.selectedIngredientIndex.next(idx);
  }
  onDelete(){
    
    this.shoppingListSrv.deleteAt(this.selectedIngredientIndex);
    console.log('',this.shoppingListSrv.fetch()); 
    this.onClear();
  }
  onClear(){
    this.frmIngredient.reset();
    this.selectedIngredientIndex=-1;
  }
}
