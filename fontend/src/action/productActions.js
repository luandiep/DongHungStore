import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productContants";
import axios from 'axios'

export const listproducts=()=>async(dispatch)=>{
    dispatch({
        type:PRODUCT_LIST_REQUEST,
    });
    try {
        const { data } = await axios.get("/api/products");
        console.log(data);
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.message})
    }

}

export const detailsProducts=(productId)=>async(dispatch)=>{
    dispatch({
        type:PRODUCT_DETAILS_REQUEST,
        payload:productId
    });
    try {
        const { data } = await axios.get(`/api/products/${productId}`);
      
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }

}


