import {HttpClientModule} from '@angular/common/http'
import { StoreModule } from '@ngrx/store';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.moudle';
import { CoreModule } from './core.module';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(
      {shoppingList:shoppingListReducer}),
    AppRoutingModule,
    SharedModule,
    CoreModule,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
