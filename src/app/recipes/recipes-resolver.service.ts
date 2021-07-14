import { RecipeService } from './recipes.service';
import { RecipeBookStorageService } from './../shared/recipe-book-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private recipeBookStorageSrv:RecipeBookStorageService,
              private recpies:RecipeService) { }
  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    // console.log('resolve',route, state);
    let curRecipes = this.recpies.fetch();
    if(curRecipes && curRecipes.length==0){
      this.recipeBookStorageSrv.fetchRecipes().subscribe(
        (recipes) => {
          curRecipes = recipes;
        }
        );
    }
    return curRecipes;

  }


}
