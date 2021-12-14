import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export enum INGREDIENT_ACTIONS {
  ADD_INGREDIENT = "ADD_INGREDIENT",
  ADD_MULTI_INGREDIENTS = "ADD_MULTI_INGREDIENTS",
  UPDATE_INGREDIENT = "UPDATE_INGREDIENT",
  DELETE_INGREDIENT = "DELETE_INGREDIENT",
  CLEAR_INGREDIENTS = "CLEAR_INGREDIENTS",
  START_EDIT = "START_EDIT",
  STOP_EDIT = "STOP_EDIT",
}

export type Actions =
  | AddIngredient
  | AddMultiIngredients
  | UpdateIngredient
  | DeleteIngredient
  | ClearIngredients
  | StartEdit
  | StopEdit;
export class AddIngredient implements Action {
  readonly type = INGREDIENT_ACTIONS.ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}
export class AddMultiIngredients implements Action {
  readonly type = INGREDIENT_ACTIONS.ADD_MULTI_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}
export class UpdateIngredient implements Action {
  readonly type = INGREDIENT_ACTIONS.UPDATE_INGREDIENT;
  constructor(public payload: { ingredient: Ingredient }) {}
}
export class DeleteIngredient implements Action {
  readonly type = INGREDIENT_ACTIONS.DELETE_INGREDIENT;
  constructor() {}
}
export class ClearIngredients implements Action {
  readonly type = INGREDIENT_ACTIONS.CLEAR_INGREDIENTS;
}
export class StartEdit implements Action {
  readonly type = INGREDIENT_ACTIONS.START_EDIT;
  constructor(public payload: number) {}
}
export class StopEdit implements Action {
  readonly type = INGREDIENT_ACTIONS.STOP_EDIT;
}
