import { Recipe } from "./../recipes/recipe.model";
// import { EventEmitter } from '@angular/core';
import { Subject } from "rxjs";
import { Ingredient } from "./../shared/ingredient.model";

export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  //ingredientSelected = new Subject<Ingredient>();
  selectedIngredientIndex = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
    new Ingredient("Onion", 7),
  ];

  fetch(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(newIngredient: Ingredient): void {
    this.upsertIngredient(newIngredient);
    this.ingredientChanged.next(this.fetch());
  }
  addIngredients(ingredientsToAdd: Ingredient[]): void {
    for (let idx = 0; idx < ingredientsToAdd.length; idx++) {
      this.upsertIngredient(ingredientsToAdd[idx]);
    }
    this.ingredientChanged.next(this.fetch());
  }
  addRecipeIngredients(recipe: Recipe): void {
    for (let idx = 0; idx < recipe.ingredients.length; idx++) {
      let curIng = this.upsertIngredient(recipe.ingredients[idx]);
      curIng.addRecipeNames(recipe.name);
    }

    this.ingredientChanged.next(this.fetch());
  }
  upsertIngredient(ingredient: Ingredient): Ingredient {
    let currentIngedient = this.ingredients.find(
      (ing) =>
        ing.name.toLocaleLowerCase() === ingredient.name.toLocaleLowerCase()
    );
    if (currentIngedient) {
      currentIngedient.amount += +ingredient.amount;
    } else {
      currentIngedient = ingredient;
      this.ingredients.push(currentIngedient);
    }
    return currentIngedient;
  }
  fetchByIndex(idx: number): Ingredient {
    return this.ingredients[idx];
  }
  deleteAt(idx: number) {
    this.ingredients.splice(idx, 1);
    return this.ingredientChanged.next(this.fetch());
  }
}
