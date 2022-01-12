// export const catelogListReducer = (state = { catelog: [] }, action) => {
//   switch (action.type) {
//     case PRODUCT_LIST_REQUEST:
//       return { loading: true };
//     case PRODUCT_LIST_SUCCESS:
//       return { loading: false, catelog: action.payload };
//     case PRODUCT_LIST_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }

import {
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
} from "../constants/productContants";

// };
export const productAddReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADD_REQUEST:
      return { loading: true };
    case PRODUCT_ADD_SUCCESS:
      return { loading: false, response: action.payload };
    case PRODUCT_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
