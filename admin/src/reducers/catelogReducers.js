import {
  CATALOG_ADD_FAIL,
  CATALOG_ADD_REQUEST,
  CATALOG_ADD_SUCCESS,
  CATALOG_LIST_FAIL,
  CATALOG_LIST_REQUEST,
  CATALOG_LIST_SUCCESS,
} from "../constants/catalogContants";

export const catelogListReducer = (state = { catelog: [] }, action) => {
  switch (action.type) {
    case CATALOG_LIST_REQUEST:
      return { loading: true };
    case CATALOG_LIST_SUCCESS:
      return { loading: false, catelog: action.payload };
    case CATALOG_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const catelogAddReducer = (state = { catelog: [] }, action) => {
  switch (action.type) {
    case CATALOG_ADD_REQUEST:
      return { loading: true };
    case CATALOG_ADD_SUCCESS:
      return { loading: false, catelog: action.payload };
    case CATALOG_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
