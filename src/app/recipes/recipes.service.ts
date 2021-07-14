import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
// import { Validators } from '@angular/forms';
@Injectable()
export class RecipeService{
    recipeSelected = new Subject<Recipe>();  
    recipeListChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] =[];
        // [new Recipe('Crispi-Chicken', 'Jhonatan crispi chicken', 'https://thecozycook.com/wp-content/uploads/2020/07/Fried-Chicken-Tenders-f.jpg',[
        //     new Ingredient("Bread crumbs",100),
        //     new Ingredient("Onion",1),
        //     new Ingredient("Oil",0.5)
        // ]),
        // new Recipe('Burgerzilla', 'One mean burger ', 'https://www.iheartnaptime.net/wp-content/uploads/2018/05/hamburger-recipe.jpg',[
        //     new Ingredient("Grind meat",500),
        //     new Ingredient("Onion",0.5),
        //     new Ingredient("Chili pepper",1),
        //     new Ingredient("BBQ souce",3),
            
        // ]),
        // new Recipe('Pizza', 'This is simply a pizza', 'https://pizzatoday.com/wp-content/uploads/2020/05/OnionPizza-1.jpg',[
        //     new Ingredient("Cheese", 1),
        //     new Ingredient("Tomato souce", 2),
        //     new Ingredient("Bazil", 3),
        //     new Ingredient("Onion",0.5),
        // ]),
        // new Recipe('Pasta', 'Great pasta', 'https://www.bishulim.co.il/sites/default/files/media/images/recipe/field_rp_main_image/anaelpasmi_0.jpeg',[
        //     new Ingredient("Tomato souce", 2),
        //     new Ingredient("Onion",0.5),
        //     new Ingredient("Olive oil",0.5),
        //     new Ingredient("Pasta",200),
        // ])
      // ];

      constructor(private shoppingListSrv:ShoppingListService){}
      setRecipes(recpies:Recipe[]):void{
        this.recipes = recpies;
        this.recipeListChanged.next(this.recipes.slice());
      }
      fetch():Recipe[] {
          
          return this.recipes.slice();
      }
      fetchByIndex(idx:number):Recipe {
        //   console.log('line 42', idx,this.recipes.slice()[idx]);
        return this.recipes.slice()[idx];
      }
      fetchByName(name:string):Recipe {
        return this.recipes.find(rcp => rcp.name === name);
      }
       addIngredientToShoppingList(ingredients:Ingredient[]){
             this.shoppingListSrv.addIngredients(ingredients);     
       }
       addRecipeIngredientToShoppingList(recipe:Recipe){
        this.shoppingListSrv.addRecipeIngredients(recipe);     
      }

      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeListChanged.next(this.recipes.slice());
      }
      updateRecipe(idx:number, recipe:Recipe){
        this.recipes[idx] = recipe;
        this.recipeListChanged.next(this.recipes.slice());
      }
       deleteRecipe(idx:number){
        this.recipes.splice(idx,1);
        this.recipeListChanged.next(this.recipes.slice());
       } 
    

}