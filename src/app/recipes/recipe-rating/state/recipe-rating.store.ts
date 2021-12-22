import { RecipeRating } from "../recipe-rating.model";
import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface RecipeRatingState {
  recipesRating: RecipeRating[];
}

export function createInitialState(): RecipeRatingState {
  return {
    recipesRating: [
      new RecipeRating(0, 10, 47),
      new RecipeRating(1, 2, 3),
      new RecipeRating(2, 0, 0),
      new RecipeRating(3, 55, 155),
    ],
  };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "recipeRating" })
export class RecipeRatingStore extends Store<RecipeRatingState> {
  constructor() {
    super(createInitialState());
  }
}
