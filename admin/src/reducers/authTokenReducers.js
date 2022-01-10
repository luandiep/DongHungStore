import {
  CHECK__FAIL,
  CHECK__REQUEST,
  CHECK__SUCCESS,
  REFRESH__TOKEN_FAIL,
  REFRESH__TOKEN_REQUEST,
  REFRESH__TOKEN_SUCCESS,
} from "../constants/authTokenContants";

export const authTokenReducers = (state = {}, action) => {
  switch (action.type) {
    case CHECK__REQUEST:
      return { loading: true };
    case CHECK__SUCCESS:
      return { loading: false, response: action.payload };
    case CHECK__FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const refReshTokenReducers = (state = {}, action) => {
  switch (action.type) {
    case REFRESH__TOKEN_REQUEST:
      return { loading: true };
    case REFRESH__TOKEN_SUCCESS:
      return { loading: false, response: action.payload };
    case REFRESH__TOKEN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
