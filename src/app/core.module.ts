import { NgModule } from "@angular/core";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorervice } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipes.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";

@NgModule({
    providers: [ShoppingListService,RecipeService , 
        {provide : HTTP_INTERCEPTORS, 
         useClass:AuthInterceptorervice,
         multi:true
        }
    ]
        
})
export class CoreModule {}