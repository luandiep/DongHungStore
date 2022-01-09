import { LOGIN__DELETE, LOGIN__FAIL, LOGIN__REQUEST, LOGIN__SUCCESS } from "../constants/loginContants";
import {removeUserSession} from "../Utils/Common"

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN__REQUEST:
      return { loading: true };
    case LOGIN__SUCCESS:
      return { loading: false, response: action.payload };
    case LOGIN__FAIL:
      return { loading: false, error: action.payload };
    case LOGIN__DELETE:
      removeUserSession();
      return state = {}
    default:
      return state;
  }
};
