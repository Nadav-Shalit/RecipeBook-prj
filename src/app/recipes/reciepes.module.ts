import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';

import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeHomeComponent } from "./recipe-home/recipe-home.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes.component";
import { SharedModule } from "../shared/shared.moudle";


@NgModule({
   imports:[
    RouterModule , 
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule
],
   declarations:[
   RecipesComponent,
   RecipeListComponent,
   RecipeDetailComponent,
   RecipeItemComponent,
   RecipeHomeComponent,
   RecipeEditComponent
   ]

})     
export class RecipesModule {
}