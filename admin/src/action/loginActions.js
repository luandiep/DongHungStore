import axios from "axios";
import { LOGIN__FAIL, LOGIN__REQUEST, LOGIN__SUCCESS, LOGIN__DELETE } from "../constants/loginContants";

export const login = (data) => async (dispatch) => {
  dispatch({
    type: LOGIN__REQUEST,
  });
  try {
    const response = await axios.post(
      "http://localhost:3001/api/auth/login", data
    ).then(res => res.data);
    console.log(response)
    dispatch({ type: LOGIN__SUCCESS, payload: response });
  } catch (error) {
    console.log({ error })
    dispatch({ type: LOGIN__FAIL, payload: error.response.data });
  }
};
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGIN__DELETE,
  });

};