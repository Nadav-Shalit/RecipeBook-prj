import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";
import { RecipeRating } from "../recipe-rating.model";

export interface RecipeRatingState extends EntityState<RecipeRating> {
  recipesRating: RecipeRating[];
}
const initState: RecipeRatingState = {
  recipesRating: [
    new RecipeRating(0, 10, 47),
    new RecipeRating(1, 2, 7),
    new RecipeRating(2, 0, 0),
    new RecipeRating(3, 55, 155),
  ],
};
export function createInitialState(): RecipeRatingState {
  return initState;
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "recipeRating" })
export class RecipeRatingStore extends EntityStore<RecipeRatingState> {
  constructor() {
    super(createInitialState());
  }
}
