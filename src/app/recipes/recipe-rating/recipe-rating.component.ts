import { Component, Input, OnInit } from "@angular/core";
import { RecipeRating } from "./recipe-rating.model";
import { RecipeRatingService } from "../recipe-rating/state/recipe-rating.service";

@Component({
  selector: "app-recipe-rating",
  templateUrl: "./recipe-rating.component.html",
  styleUrls: ["./recipe-rating.component.css"],
})
export class RecipeRatingComponent implements OnInit {
  @Input() index: number;
  stars: number[] = [0, 0, 0, 0, 0];
  recipeRating: RecipeRating;
  constructor(private RecipeRatingSrv: RecipeRatingService) {}

  ngOnInit(): void {
    this.recipeRating = this.RecipeRatingSrv.getReipeRating(this.index);
    for (let idx = 0; idx < Math.floor(this.getAvgRating()); idx++) {
      this.stars[idx] = 1;
    }
  }
  getAvgRating(): number {
    let avgRating = 0;
    if (this.recipeRating && this.recipeRating.votesCount > 0) {
      avgRating = this.recipeRating.ratingTotal / this.recipeRating.votesCount;
    }
    return avgRating;
  }
}
