import "./App.css";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Login from "./Component/Login/login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Component/Register/register";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { useSelector } from "react-redux";
import { setRefReshTokenSession } from "./Utils/Common";

function App(props) {
  const refreshToken = useSelector((state) => state.authrefReshToken);

  useEffect(() => {
    if (refreshToken.response) {
      if (refreshToken.response.accessToken) {
        setRefReshTokenSession(refreshToken.response.accessToken);
      }
    } else if (refreshToken.error) {
      alert(refreshToken.error);
    }
    // if (error_refresh) {
    //   alert(error_refresh);
    //   removeUserSession();
    //   history.push("/login"); // no longer in React Router V4
    // }
    // if (response_refresh) {
    //   console.log(response_refresh);
    //   setUserSession(
    //     response_refresh.accessToken,
    //     response_refresh.user.username,
    //     response_refresh.refreshToken
    //   );
    // }
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
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJuYW1lIjoibHVhbmRpZXAxOEBnbWFpbC5jb20iLCJpZCI6NX0sImlhdCI6MTY0MTgwNzQ4OSwiZXhwIjoxNjQxODA3NDk5fQ.chUwfzc3uyRYcIT5I1Gc0oxlUPe37l-XSm4poDeeMFo
