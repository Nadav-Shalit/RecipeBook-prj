import { Ingredient } from 'src/app/shared/ingredient.model';
//import * as ShoppingListActios from './shopping-list.actions'

const initState ={
    ingredient:  [
        new Ingredient("Onion", 1),
        new Ingredient("Salt", 2),
    ]
}


// export function shoppingListReducer(state = initState, 
//                                     action:ShoppingListActios.AddIngredient){
//  switch (action.type) {
//      case ShoppingListActios.INGREDIENT_ACTIONS.ADD_INGREDIENT:
//          return {
//              ...state,// No need since we have only one propety, but is a good practice to copy the old state
//              ingredient:[...state.ingredient].push(action.payload)
//          }
//          break;
 
//      default:
//          break;
//  }
// }