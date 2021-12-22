import { RecipeRating } from "../recipe-rating.model";
import { RecipeRatingStore } from "./recipe-rating.store";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class RecipeRatingService {
  constructor(private RecipeRatingStore: RecipeRatingStore) {}

  getReipeRating(recipeIndex: number): RecipeRating {
    console.log(
      "getReipeRating:10",
      this.RecipeRatingStore.getValue().recipesRating
    );
    return this.RecipeRatingStore.getValue().recipesRating[recipeIndex];
  }
  addRecipeRating(recipeIndex: number) {
    const newRecipeRating = new RecipeRating(recipeIndex, 50, 155);

    this.RecipeRatingStore.getValue().recipesRating.push(newRecipeRating);
    //his.RecipeRatingStore.
  }
}
