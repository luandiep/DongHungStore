import "./App.css";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Login from "./Component/Login/login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Component/Register/register";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { useSelector } from "react-redux";
import { removeUserSession, setRefReshTokenSession } from "./Utils/Common";
import history from "./history";
function App(props) {
  const refreshToken = useSelector((state) => state.authrefReshToken);

  useEffect(() => {
    if (refreshToken.response) {
      if (refreshToken.response.accessToken) {
        setRefReshTokenSession(refreshToken.response.accessToken);
      }
    } else if (refreshToken.error) {
      alert(refreshToken.error);
      removeUserSession();
      history.push("/login"); // no longer in React Router V4
    }
  }, [refreshToken]);

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
