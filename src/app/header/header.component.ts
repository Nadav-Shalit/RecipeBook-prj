import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { User } from "./../auth/user.model";
import { Subscription } from "rxjs";
import { AuthService } from "./../auth/auth.service";
import { RecipeBookStorageService } from "./../shared/recipe-book-storage.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import * as fromAppState from "./../store/app.reducer";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isAuthUser = false;

  constructor(
    private recipeBookStorageService: RecipeBookStorageService,
    private authSrv: AuthService,
    private store: Store<fromAppState.AppState>
  ) {}

  ngOnInit() {
    this.userSubscription = this.store
      .select("auth")
      .pipe(map((authState) => authState.user))
      .subscribe((user: User) => {
        this.isAuthUser = !!user;
      });
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  saveAll() {
    const recTest = new Recipe(
      "Spaciy-Chicken",
      "Nadavs Spaciy chicken",
      "https://thecozycook.com/wp-content/uploads/2020/07/Fried-Chicken-Tenders-f.jpg",
      [
        new Ingredient("Bread crumbs", 100),
        new Ingredient("Onion", 1),
        new Ingredient("Oil", 0.5),
        new Ingredient("Peper", 1),
      ]
    );

    let confirm = window.confirm("save all");
    if (confirm) {
      this.recipeBookStorageService.saveRecipes();
    }
  }
  fetchAll() {
    const recipes = this.recipeBookStorageService.fetchRecipes().subscribe();
  }
  restoreRecipes() {
    this.recipeBookStorageService.restoreRecipes();
    this.fetchAll();
  }
  onLogout() {
    this.authSrv.logout();
  }
}
