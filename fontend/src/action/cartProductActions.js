import Axios from "axios";

import {
  CART_ADD_ITEM,
  CART_DELETE_ITEM,
} from "../constants/cartProductContants";

export const cartAddProducts =
  (productId, qty) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: productId,
        name: data.name,
        category: data.category,
        image: data.image,
        price: data.price,
        countInStock: qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
export const cartDeleteProduct =
  (productId, qty) => async (dispatch, getState) => {
    dispatch({
      type: CART_DELETE_ITEM,
      payload: productId,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
