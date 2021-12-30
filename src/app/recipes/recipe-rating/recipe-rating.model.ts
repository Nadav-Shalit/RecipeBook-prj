export class RecipeRating {
  public votes: number;
  public ratingTotal: number;
  constructor(votes: number = 0, ratingTotal: number = 0) {
    this.votes = votes;
    this.ratingTotal = ratingTotal;
  }
}
