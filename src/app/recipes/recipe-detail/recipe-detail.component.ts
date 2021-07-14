
import { RecipeService } from './../recipes.service';
//import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isNumeric } from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  index:number;
  
  constructor(private recipeSrv:RecipeService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    let curValue = this.route.snapshot.params['value'];
    // this.recipe = (isNumeric(curValue)) 
    //                         ? this.recipeSrv.fetchByIndex(+curValue) 
    //                         : this.recipeSrv.fetchByName(curValue);
    this.route.params.subscribe(
      (prm:Params) => {
        curValue = prm['value'];
        this.recipe = (isNumeric(curValue)) 
        ? this.recipeSrv.fetchByIndex(+curValue) 
        : this.recipeSrv.fetchByName(curValue);;
      this.index = (isNumeric(curValue)) ? +curValue : -1;
      }      
    )    
  if(!this.recipe){
    alert('Recipe not found for value:' + curValue);
    this.router.navigate([''],{state:{msg:'Recipe not found'}});
  }
}

onAddToShoppingList(){
  this.recipeSrv.addRecipeIngredientToShoppingList(this.recipe);    
  
}
onDeleteRecipe(){
  this.recipeSrv.deleteRecipe(this.index);
  this.router.navigate(['']);
  }

}
