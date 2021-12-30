import { RecipeRating } from "./recipe-rating.model";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-recipe-rating",
  templateUrl: "recipe-rating.component.html",
  styleUrls: ["recipe-rating.component.css"],
})
export class RecipeRatingComponent implements OnInit {
  @Input() recipeRating: RecipeRating;
  stars: number[] = [0, 0, 0, 0, 0];
  constructor() {}

  ngOnInit(): void {
    this.updateStars();
  }
  ratingAvg(): number {
    return this.recipeRating && this.recipeRating.votes > 0
      ? Math.round(this.recipeRating.ratingTotal / this.recipeRating.votes)
      : 0;
  }
  setRatingValue(ratingValue: number) {
    this.recipeRating.votes++;
    this.recipeRating.ratingTotal = this.recipeRating.ratingTotal + ratingValue;
    this.updateStars();
  }
  updateStars() {
    this.stars = [0, 0, 0, 0, 0];
    for (let idx = 1; this.recipeRating && idx <= this.ratingAvg(); idx++) {
      this.stars[idx - 1] = 1;
    }
  }
}
