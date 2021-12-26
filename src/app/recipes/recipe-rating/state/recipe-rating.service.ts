import { ReciepRatingQuery } from "./recipe-rating.query";
import { RecipeRating } from "../recipe-rating.model";
import { RecipeRatingStore } from "./recipe-rating.store";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class RecipeRatingService {
  constructor(
    private recipeRatingStore: RecipeRatingStore,
    private reciepRatingQuery: ReciepRatingQuery
  ) {}

  getReipeRating(recipeIndex: number): RecipeRating {
    return this.recipeRatingStore.getValue().recipesRating[recipeIndex];
  }

  addRecipeRating(recipeIndex: number) {
    const newRecipeRating = new RecipeRating(recipeIndex, 0, 0);
    this.recipeRatingStore.update((state) => {
      return {
        recipesRating: [...state.recipesRating, newRecipeRating],
      };
    });
  }
  updateRecipeRating(recipeIndex: number, ratingValue: number = 1) {
    this.recipeRatingStore.update((state) => {
      const updatedRecipesRating: RecipeRating[] = [...state.recipesRating];
      updatedRecipesRating[recipeIndex] = {
        ...updatedRecipesRating[recipeIndex],
        votesCount: updatedRecipesRating[recipeIndex].votesCount + 1,
        ratingTotal:
          updatedRecipesRating[recipeIndex].ratingTotal + ratingValue,
      };
      const retSate = {
        ...state,
        recipesRating: updatedRecipesRating,
      };
      return retSate;
    });
  }
}
