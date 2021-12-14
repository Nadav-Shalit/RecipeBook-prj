import { User } from "./../user.model";
import * as AuthActions from "./auth.action";
export interface State {
  user: User;
}

const initState: State = {
  user: null,
};
export function authReducer(state = initState, action: AuthActions.Actions) {
  switch (action.type) {
    case AuthActions.USER_ACTIONS.LOGIN:
      return { ...state, user: action.payload };
    case AuthActions.USER_ACTIONS.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
}
