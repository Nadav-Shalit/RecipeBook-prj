import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { RecipeRatingStore, RecipeRatingState } from "./recipe-rating.store";

@Injectable({ providedIn: "root" })
export class ReciepRatingQuery extends Query<RecipeRatingState> {
  selectRecipesRating$ = this.select("recipesRating");
  selectRecipeRatingByIndex$ = this.select("recipesRating");
  constructor(protected store: RecipeRatingStore) {
    super(store);
  }
}
