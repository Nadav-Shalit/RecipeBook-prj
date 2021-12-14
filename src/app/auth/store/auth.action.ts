import { Action } from "@ngrx/store";
import { User } from "../user.model";
export enum USER_ACTIONS {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export type Actions = Login | Logout;

export class Login implements Action {
  readonly type = USER_ACTIONS.LOGIN;
  constructor(public payload: User) {}
}
export class Logout implements Action {
  readonly type = USER_ACTIONS.LOGOUT;
}
