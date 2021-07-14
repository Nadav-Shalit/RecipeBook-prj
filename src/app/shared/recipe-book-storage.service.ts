import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipes.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeBookStorageService {
  urlRecipes:string ='https://recipes-6c95f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  queryStringParams:HttpParams = new HttpParams();

  constructor(private http:HttpClient,
    private recipeSrv:RecipeService) {
    this.queryStringParams.append('print','pretty');
   }

   fetchRecipes(){
          return this.http.get<Recipe[]>(this.urlRecipes).pipe(
                                                                tap(
                                                                  (recpies) => {
                                                                    // console.log('recpies',recpies);
                                                                    let arr:Recipe[] = [];
                                                                    for (const rcp of recpies) {
                                                                      arr.push(rcp as Recipe)
                                                                    }
                                                                    // console.log('setRecipes',recpies,arr);
                                                                    this.recipeSrv.setRecipes(recpies);
                                                                  }
                                                                )
                                                                );
    
   }
   restoreRecipes() {
    let recipes: Recipe[] =
    [new Recipe('Crispi-Chicken', 'Jhonatan crispi chicken', 'https://thecozycook.com/wp-content/uploads/2020/07/Fried-Chicken-Tenders-f.jpg',[
        new Ingredient("Bread crumbs",100),
        new Ingredient("Onion",1),
        new Ingredient("Oil",0.5)
    ]),
    new Recipe('Burgerzilla', 'One mean burger ', 'https://www.iheartnaptime.net/wp-content/uploads/2018/05/hamburger-recipe.jpg',[
        new Ingredient("Grind meat",500),
        new Ingredient("Onion",0.5),
        new Ingredient("Chili pepper",1),
        new Ingredient("BBQ souce",3),
        
    ]),
    new Recipe('Pizza', 'This is simply a pizza', 'https://pizzatoday.com/wp-content/uploads/2020/05/OnionPizza-1.jpg',[
        new Ingredient("Cheese", 1),
        new Ingredient("Tomato souce", 2),
        new Ingredient("Bazil", 3),
        new Ingredient("Onion",0.5),
    ]),
    new Recipe('Pasta', 'Great pasta', 'https://www.bishulim.co.il/sites/default/files/media/images/recipe/field_rp_main_image/anaelpasmi_0.jpeg',[
        new Ingredient("Tomato souce", 2),
        new Ingredient("Onion",0.5),
        new Ingredient("Olive oil",0.5),
        new Ingredient("Pasta",200),
    ])
  ];
    this.http.put<{name:string}>(
      this.urlRecipes,
      recipes,
     // {params: this.queryStringParams}
    ).subscribe(
     {
       next:
       (response) => {
         console.log('response', response);
       },
       error:
       (err) => {
         console.log('err', err);
       }
     }
    )
    }

   saveRecipes() {
    this.http.put<{name:string}>(
      this.urlRecipes,
      this.recipeSrv.fetch(),
     // {params: this.queryStringParams}
    ).subscribe(
     {
       next:
       (response) => {
         console.log('response', response);
       },
       error:
       (err) => {
         console.log('err', err);
       }
     }
    )
      // for (const recipe of this.recipeSrv.fetch()) {
      //   this.saveRecipe(recipe);
      // }
    }

   saveRecipe(postRecipe:Recipe){
     this.http.put<{name:string}>(
       this.urlRecipes,
       postRecipe,
      // {params: this.queryStringParams}
     ).subscribe(
      {
        next:
        (response) => {
          console.log('response', response);
        },
        error:
        (err) => {
          console.log('err', err);
        }
      }
     )
   }

}
