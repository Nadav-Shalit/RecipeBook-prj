export class Ingredient {
  recipeNames: string[] = [];

  constructor(
    public name: string,
    public amount: number,
    private recipeName: string = ""
  ) {
    if (recipeName && this.recipeNames.indexOf(recipeName) === -1) {
      this.recipeNames.push(recipeName);
    }
  }

  addRecipeNames(recipeName: string) {
    if (recipeName && this.recipeNames.indexOf(recipeName) === -1) {
      this.recipeNames.push(recipeName);
    }
  }
  recipesList(): string {
    return this.recipeNames ? this.recipeNames.join(",").trim() : "";
  }
}
