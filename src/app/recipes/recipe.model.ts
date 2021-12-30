import { RecipeRating } from "./recipe-rating/recipe-rating.model";
import { Ingredient } from "./../shared/ingredient.model";
export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];
  public rating: RecipeRating;

  constructor(
    name: string,
    desc: string,
    imagePath: string,
    ingredients: Ingredient[]
  ) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
    this.rating = new RecipeRating(0, 0);
  }
}
