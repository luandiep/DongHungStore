import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  catelogAddReducer,
  catelogListReducer,
} from "../src/reducers/catelogReducers";
import { uploadImageReducer } from "./reducers/imageReducers";
import { loginReducer } from "./reducers/loginReducers";
import {
  authTokenReducers,
  refReshTokenReducers,
} from "./reducers/authTokenReducers";
import { productAddReducer } from "./reducers/productReducers";

const initialState = {};

const reducer = combineReducers({
  catelogList: catelogListReducer,
  catelogAdd: catelogAddReducer,
  uploadImages: uploadImageReducer,
  logins: loginReducer,
  authToken: authTokenReducers,
  authrefReshToken: refReshTokenReducers,
  addProduct: productAddReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
