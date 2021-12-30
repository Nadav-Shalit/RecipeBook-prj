import { Ingredient } from "./../../../shared/ingredient.model";
// import { RecipeService } from './../../recipes.service';
import { Component, OnInit, Input } from "@angular/core";

import { Recipe } from "../../recipe.model";
import { RecipeRating } from "../../recipe-rating/recipe-rating.model";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor() {}

  ngOnInit() {
    if (!this.recipe.rating) {
      this.recipe.rating = new RecipeRating(0, 0);
    }
  }
}
