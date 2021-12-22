export class RecipeRating {
  public recipeIndex: number = -1;
  public votesCount: number = 0;
  public ratingTotal: number = 0;
  constructor(recipeIndex: number, votesCount: number, ratingTotal: number) {
    this.recipeIndex = recipeIndex;
    this.votesCount = votesCount;
    this.ratingTotal = ratingTotal;
  }
  get RatingAvg(): number {
    return this.votesCount > 0 ? this.ratingTotal / this.votesCount : 0;
  }
}
