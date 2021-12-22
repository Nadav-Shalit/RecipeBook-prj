import { Subscription } from "rxjs";
import { RecipeService } from "./../recipes.service";
import { Component, OnDestroy, OnInit } from "@angular/core";

import { Recipe } from "../recipe.model";
import { RecipeBookStorageService } from "src/app/shared/recipe-book-storage.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscriptionSubmit: Subscription;
  subsFetchRecipe: Subscription;
  constructor(
    private recipeSrv: RecipeService,
    private recipeBookStorageService: RecipeBookStorageService
  ) {}

  ngOnInit() {
    this.subsFetchRecipe = this.subscriptionSubmit =
      this.recipeSrv.recipeListChanged.subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });

    this.recipes = this.recipeSrv.fetch();
    if (this.recipes.length === 0) {
      this.recipeBookStorageService.fetchRecipes().subscribe((rec) => {
        this.recipes = rec;
      });
    }
    // console.log('after fetch',this.recipes);
  }
  ngOnDestroy() {
    if (this.subsFetchRecipe) {
      this.subsFetchRecipe.unsubscribe();
    }
    this.subscriptionSubmit.unsubscribe();
  }
}
