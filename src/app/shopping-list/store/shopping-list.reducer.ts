import { Recipe } from "./../../recipes/recipe.model";
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
  let updateIngredients: Ingredient[] = [...state.ingredients];
  switch (action.type) {
    case ShoppingListActios.INGREDIENT_ACTIONS.ADD_INGREDIENT:
      let ingredient: Ingredient = action.payload;
      updateIngredients = upsertIngredient(updateIngredients, [ingredient]);

      return {
        ...state,
        ingredients: updateIngredients,
        selectedIndex: -1,
        curIngredient: null,
      };
      break;
    case ShoppingListActios.INGREDIENT_ACTIONS.ADD_MULTI_INGREDIENTS:
      updateIngredients = upsertIngredient(updateIngredients, [
        ...action.payload,
      ]);
      return {
        ...state, // No need since we have only one propety, but is a good practice to copy the old state
        ingredients: updateIngredients,
        selectedIndex: -1,
        curIngredient: null,
      };
      break;
    case ShoppingListActios.INGREDIENT_ACTIONS.UPDATE_INGREDIENT:
      updateIngredients[state.selectedIndex] = action.payload.ingredient;
      // updateIngredients[state.selectedIndex].recipeNames = [
      //   ...action.payload.ingredient.recipeNames,
      // ];
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
function upsertIngredient(
  updateIngredients: Ingredient[],
  newIngredients: Ingredient[]
) {
  newIngredients.forEach((newIng) => {
    const idx = updateIngredients.findIndex((ing) => {
      return ing.name.toLocaleLowerCase() === newIng.name.toLocaleLowerCase();
    });
    if (idx === -1) {
      updateIngredients = [...updateIngredients, newIng];
    } else {
      const recipeNames: string[] = [...updateIngredients[idx].recipeNames];
      updateIngredients[idx] = new Ingredient(
        newIng.name,
        updateIngredients[idx].amount + newIng.amount
      );
      newIng.recipeNames.forEach((rcp) => {
        recipeNames.push(rcp);
      });
      recipeNames.forEach((rcp) => {
        updateIngredients[idx].addRecipeNames(rcp);
      });
    }
  });

  return updateIngredients;
}
