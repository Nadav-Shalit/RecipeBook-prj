// import { Action } from '@ngrx/store';

import { Ingredient } from 'src/app/shared/ingredient.model';


export enum INGREDIENT_ACTIONS {
    ADD_INGREDIENT = 'ADD_INGREDIENT',
    UPDATE_INGREDIENT = 'UPDATE_INGREDIENT',
    DELETE_INGREDIENT = 'DELETE_INGREDIENT',
    CLEAR_INGREDIENT = 'CLEAR_INGREDIENT'    
  }

//  export class AddIngredient implements Action{
//      readonly type = INGREDIENT_ACTIONS.ADD_INGREDIENT;
//      payload:Ingredient;


//     } 