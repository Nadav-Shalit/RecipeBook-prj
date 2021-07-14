import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../shared/shared.moudle";

@NgModule({
    declarations:[
        AuthComponent
    ],    
    imports:[FormsModule, 
        CommonModule, 
        SharedModule,
        RouterModule.forChild([
            {path:'', component:AuthComponent}
        ])
    ],
    //exports:[AuthComponent]
    
})
export class AuthModule {}