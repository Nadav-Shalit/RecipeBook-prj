import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DropdownDirective } from "./dropdown.directive";
import { PlaceholderDirective } from './placehholder/placeholder.directive';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
    declarations:[
        DropdownDirective,
        PlaceholderDirective,
        LoadingSpinnerComponent,
        AlertComponent
    ],
    imports:[
        CommonModule
    ],
    exports:[
        DropdownDirective,
        PlaceholderDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        CommonModule
    ],

})
export class SharedModule{}