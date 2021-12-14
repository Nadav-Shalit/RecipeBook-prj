import { NgModule } from "@angular/core";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipes.service";
// import { ShoppingListService } from "./shopping-list/shopping-list.service"; //Comment since we use the store and state

@NgModule({
  providers: [
    //ShoppingListService, //Comment since we use the store and state
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
