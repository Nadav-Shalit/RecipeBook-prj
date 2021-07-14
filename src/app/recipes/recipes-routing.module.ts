import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { RecipeHomeComponent } from './recipe-home/recipe-home.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes.component';

import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipesResolverService } from './recipes-resolver.service';

const recipesRoutes:Routes =[

    {
    path:'',component:RecipesComponent,
    canActivate:[AuthGuardService],
    children:[
                {path:'',component:RecipeHomeComponent},
                {path:'new',component:RecipeEditComponent},
                {path:':value/edit',component:RecipeEditComponent,resolve:[RecipesResolverService]},
                {path:':value',component:RecipeDetailComponent, resolve:[RecipesResolverService] },
            ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(recipesRoutes)],
    exports:[RouterModule]
})
export class RecipesRoutingModule {}