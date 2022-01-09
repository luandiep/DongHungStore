import "./App.css";
import axios from "axios";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Login from "./Component/Login/login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Component/Register/register";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import {
  getRefReshToken,
  getToken,
  removeUserSession,
  setUserSession,
} from "./Utils/Common";
import history from "./history";
import { useDispatch, useSelector } from "react-redux";
import { checktoken, refreshtoken } from "./action/authTokenActions";

function App(props) {
  const dispatch = useDispatch();
  const { error, response } = useSelector((state) => state.authToken);
  const { error_refresh, response_refresh } = useSelector(
    (state) => state.authToken
  );
  useEffect(() => {
    const token = getToken();
    const refreshtokens = getRefReshToken();
    if (!token && !refreshtokens) {
      return;
    } else {
      dispatch(checktoken());
    }

    if (response) {
    } else if (error) {
      dispatch(refreshtoken(refreshtokens));
      if (response_refresh) {
        setUserSession(
          response_refresh.accessToken,
          response_refresh.user.username,
          response_refresh.refreshToken
        );
      } else if (error_refresh) {
        alert(error_refresh);
        removeUserSession();
        history.push("/login"); // no longer in React Router V4
      }
      // removeUserSession();
      // alert("hết hạn phiên làm việc" + error);
      // history.push("/login"); // no longer in React Router V4
    }
  }, [error, response]);

  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route component={Register} path="/register" />

          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/" component={Sidebar} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
