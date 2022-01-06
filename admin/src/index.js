import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import history from "./history";
import reportWebVitals from "./reportWebVitals";
import { Router } from "react-router-dom";
import store from "./Store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();