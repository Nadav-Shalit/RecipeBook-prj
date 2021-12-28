import { Observable } from "rxjs";
import { RecipeService } from "./../recipes.service";
import { Component, OnDestroy, OnInit } from "@angular/core";

import { Recipe } from "../recipe.model";
import { RecipeBookStorageService } from "src/app/shared/recipe-book-storage.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  constructor(private recipeBookStorageService: RecipeBookStorageService) {}

  ngOnInit() {
    this.recipes$ = this.recipeBookStorageService.fetchRecipes();
  }
}
