
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes:Routes = [

{path: '',redirectTo:'/recipes', pathMatch:'full'},

///New Version
{
  path: 'recipes',
  loadChildren: () =>
    import('./recipes/reciepes.module').then(
      (m) => m.RecipesModule
    ),
},
{
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListMoudle
      ),
  },
///Old Version  
{path:'auth', loadChildren:'./auth/auth.module#AuthModule'},

]
@NgModule({
    imports:[RouterModule.forRoot(appRoutes, {preloadingStrategy:PreloadAllModules})],
    exports:[RouterModule]
})

export class AppRoutingModule{

}