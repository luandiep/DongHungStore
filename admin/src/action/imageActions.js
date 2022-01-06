import axios from "axios";
import { UPLOAD_IMAGE_FAIL, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS } from "../constants/imageContants";



export const uploadimage = (data) => async (dispatch) => {
  dispatch({
    type: UPLOAD_IMAGE_REQUEST,
  });

  try {
    const { body } = await axios.post(
      "http://localhost:3001/upload",
      body,
      {
        headers: {
          x_authorization: sessionStorage.getItem("accessToken"),
        },
      }
    );
    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPLOAD_IMAGE_FAIL, payload: error.response.data });
  }
};
