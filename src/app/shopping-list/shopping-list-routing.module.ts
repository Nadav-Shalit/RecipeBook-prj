import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { ShoppingListComponent } from './shopping-list.component';
// import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';


const shoppingListRoutes:Routes = [
    {path:'', component: ShoppingListComponent
    // ,children:[
    //     {path:'edit', component:ShoppingEditComponent}
    //         ]
    }
];

 
@NgModule({
    declarations:[],
    imports:[RouterModule.forChild(shoppingListRoutes)],
    exports:[RouterModule],

})

export class ShoppingListRoutingModule{

}