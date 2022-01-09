import axios from "axios";
import {
  CATALOG_ADD_FAIL,
  CATALOG_ADD_REQUEST,
  CATALOG_ADD_SUCCESS,
  CATALOG_LIST_FAIL,
  CATALOG_LIST_REQUEST,
  CATALOG_LIST_SUCCESS,
} from "../constants/catalogContants";

export const listcatelog = () => async (dispatch) => {
  dispatch({
    type: CATALOG_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(
      "http://localhost:3001/api/catalog/getall"
    );
    dispatch({ type: CATALOG_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATALOG_LIST_FAIL, payload: error.message });
  }
};
export const addcatalog = (body) => async (dispatch) => {
  dispatch({
    type: CATALOG_ADD_REQUEST,
  });

  try {
    const { data } = await axios.post(
      "http://localhost:3001/api/catalog/add",
      body,
      {
        headers: {
          x_authorization: sessionStorage.getItem("accessToken"),
        },
      }
    );
    dispatch({ type: CATALOG_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATALOG_ADD_FAIL, payload: error });
  }
};
