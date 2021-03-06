import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from '../shared/shared.moudle';
// import { LoggingService } from '../logging.service';

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports:[
        RouterModule,
        SharedModule, 
        FormsModule,
        ShoppingListRoutingModule
    ],
    // providers:[LoggingService]
        
})

export class ShoppingListMoudle {

}