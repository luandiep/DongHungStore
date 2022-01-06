import "./App.css";
import axios from "axios";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Login from "./Component/Login/login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Component/Register/register";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import { getToken, removeUserSession } from "./Utils/Common";
import history from "./history";

function App(props) {
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`http://localhost:3001/api/auth/auth`, {
        headers: {
          x_authorization: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.username) {
        }
      })
      .catch((error) => {
        removeUserSession();
        alert("hết hạn phiên làm việc" + error);
        history.push("/login"); // no longer in React Router V4
      });
  }, []);

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
