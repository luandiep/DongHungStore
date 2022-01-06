import axios from "axios";
import {
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
} from "../constants/productContants";

// export const listcatelog = () => async (dispatch) => {
//   dispatch({
//     type: PRODUCT_LIST_REQUEST,
//   });
//   try {
//     const { data } = await axios.get(
//       "http://localhost:3001/api/catalog/getall"
//     );
//     dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
//   }
// };
export const addproduct = (body) => async (dispatch) => {
  dispatch({
    type: PRODUCT_ADD_REQUEST,
  });

  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/product/add",
      body,
      {
        headers: {
          x_authorization: sessionStorage.getItem("accessToken"),
        },
      }
    );
    dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_ADD_FAIL, payload: error.response.data });
  }
};
