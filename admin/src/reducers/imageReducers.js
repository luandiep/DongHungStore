import {
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from "../constants/imageContants";

export const uploadImageReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loading: true };
    case UPLOAD_IMAGE_SUCCESS:
      return { loading: false, imageLink: action.payload };
    case UPLOAD_IMAGE_FAIL:
      return { loading: false, errorImage: action.payload };
    default:
      return state;
  }
};
