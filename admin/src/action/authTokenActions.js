import axios from "axios";
import { useSelector } from "react-redux";
import {
  CHECK__FAIL,
  CHECK__REQUEST,
  CHECK__SUCCESS,
  REFRESH__TOKEN_FAIL,
  REFRESH__TOKEN_REQUEST,
  REFRESH__TOKEN_SUCCESS,
} from "../constants/authTokenContants";

export const checktoken = () => async (dispatch) => {
  dispatch({
    type: CHECK__REQUEST,
  });
  try {
    const response = await axios
      .get(`http://localhost:3001/api/auth/auth`, {
        headers: {
          x_authorization: sessionStorage.getItem("accessToken"),
        },
      })
      .then((res) => res.data);

    dispatch({ type: CHECK__SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: CHECK__FAIL, payload: error.response.data });
    if (sessionStorage.getItem("accessToken")) {
      dispatch(refreshtoken(sessionStorage.getItem("refreshToken")));
    }
  }
};
export const refreshtoken = (refreshToken) => async (dispatch) => {
  dispatch({
    type: REFRESH__TOKEN_REQUEST,
  });
  try {
    const response = await axios
      .post(
        `http://localhost:3001/api/auth/refresh`,
        { refreshToken: refreshToken },
        {
          headers: {
            x_authorization: sessionStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => res.data);

    dispatch({ type: REFRESH__TOKEN_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: REFRESH__TOKEN_FAIL, payload: error.response.data });
  }
};
