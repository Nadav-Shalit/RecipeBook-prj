import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActios from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  curIngredient: Ingredient;
  selectedIndex: number;
}
export interface AppState {
  shoppingList: State;
}
const initState: State = {
  ingredients: [
    new Ingredient("Onion", 1),
    new Ingredient("Salt", 2),
    new Ingredient("Corn", 0.5),
  ],
  curIngredient: null,
  selectedIndex: -1,
};

export function shoppingListReducer(
  state: State = initState,
  action: ShoppingListActios.Actions
) {
  switch (action.type) {
    case ShoppingListActios.INGREDIENT_ACTIONS.ADD_INGREDIENT:
      return {
        ...state, // No need since we have only one propety, but is a good practice to copy the old state
        ingredients: [...state.ingredients, action.payload],
      };
      break;
    case ShoppingListActios.INGREDIENT_ACTIONS.ADD_MULTI_INGREDIENTS:
      return {
        ...state, // No need since we have only one propety, but is a good practice to copy the old state
        ingredients: [...state.ingredients, ...action.payload],
      };
      break;
    case ShoppingListActios.INGREDIENT_ACTIONS.UPDATE_INGREDIENT:
      const updateIngredients: Ingredient[] = [...state.ingredients];
      updateIngredients[state.selectedIndex] = action.payload.ingredient;
      return {
        ...state,
        ingredients: updateIngredients,
        selectedIndex: -1,
        curIngredient: null,
      };
      break;
    case ShoppingListActios.INGREDIENT_ACTIONS.DELETE_INGREDIENT:
      const deletedIngredients: Ingredient[] = [...state.ingredients];
      const deletedIngredient = deletedIngredients.splice(
        state.selectedIndex,
        1
      );

      return {
        ...state,
        ingredients: [...deletedIngredients],
        selectedIndex: -1,
        curIngredient: null,
      };
      break;
    case ShoppingListActios.INGREDIENT_ACTIONS.CLEAR_INGREDIENTS:
      return {
        ...state,
        ingredients: [],
        selectedIndex: -1,
        curIngredient: null,
      };
      break;
    case ShoppingListActios.INGREDIENT_ACTIONS.START_EDIT:
      return {
        ...state,
        selectedIndex: action.payload,
        curIngredient: { ...state.ingredients[action.payload] },
      };
      break;
    case ShoppingListActios.INGREDIENT_ACTIONS.STOP_EDIT:
      return {
        ...state,
        selectedIndex: -1,
        curIngredient: null,
      };
      break;
    default:
      console.log("state:", state);
      return state;
      break;
  }
}
