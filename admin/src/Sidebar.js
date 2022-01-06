import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import Home from "./Component/Home/Home";
import ListProduct from "./Component/product/listProduct";
import AddProduct from "./Component/product/addProduct";
import "../src/css/fragment.css";
import Register from "./Component/Register/register";
import { removeUserSession } from "./Utils/Common";
export default function Sidebar(props) {
  const [showtoggle, setShowtoggle] = React.useState(false);
  function SignOut() {
    removeUserSession();
    props.history.push("/login");
  }
  function ischecktoggle(event) {
    setShowtoggle(!showtoggle);
  }
  return (
    <Router>
      <Route
        render={({ location, history }) => (
          <React.Fragment>
            <SideNav
              onSelect={(selected) => {
                const to = "/" + selected;
                if (location.pathname !== to) {
                  history.push(to);
                }
                console.log("1");
              }}
              onToggle={() => ischecktoggle(false)}
            >
              <SideNav.Toggle />
              <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                  <NavIcon>
                    <i
                      className="fa fa-fw fa-home"
                      style={{ fontSize: "1.75em" }}
                    />
                  </NavIcon>
                  <NavText>Home</NavText>
                </NavItem>
                <NavItem eventKey="product">
                  <NavIcon>
                    <i
                      className="fa fa-shopping-cart"
                      style={{ fontSize: "1.75em" }}
                    />
                  </NavIcon>
                  <NavText>Quản lý sản phẩm</NavText>
                  <NavItem eventKey="product/list">
                    <NavText>Danh sách sản phẩm</NavText>
                  </NavItem>
                  <NavItem eventKey="product/add">
                    <NavText>Thêm sản phẩm</NavText>
                  </NavItem>
                </NavItem>
                <NavItem eventKey="user">
                  <NavIcon>
                    <i
                      className="fa fa-user-o"
                      style={{ fontSize: "1.75em" }}
                    />
                  </NavIcon>
                  <NavText>Quản lý người dùng</NavText>
                  <NavItem eventKey="user/list">
                    <NavText>Danh sách người dùng</NavText>
                  </NavItem>
                  <NavItem eventKey="user/add">
                    <NavText>Thêm người dùng</NavText>
                  </NavItem>
                </NavItem>
                <NavItem onClick={SignOut} disabled={true}>
                  <NavIcon>
                    <i
                      className="fa fa-sign-out"
                      style={{ fontSize: "1.75em" }}
                    />
                  </NavIcon>
                  <NavText>Đăng xuất</NavText>
                </NavItem>
              </SideNav.Nav>
            </SideNav>

            <main className={showtoggle ? "main eupnTP " : "main bWcVOO"}>
              <Route path="/" exact component={(props) => <Home />}></Route>
              <Route
                path="/product/list"
                component={(props) => <ListProduct />}
              ></Route>
              <Route
                path="/product/add"
                component={(props) => <AddProduct />}
              ></Route>
            </main>
          </React.Fragment>
        )}
      />
    </Router>
  );
}
