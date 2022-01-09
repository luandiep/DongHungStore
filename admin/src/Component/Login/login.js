import React, { useEffect, useState } from "react";
import "../../css/Login/login.css";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { setUserSession } from "../../Utils/Common";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../action/loginActions";

export default function Login(props) {
  const dispatch = useDispatch();
  const Initilvalue = {
    username: "",
    password: "",
  };


  const validationValue = Yup.object().shape({
    username: Yup.string().required("Không được bỏ trống"),
    password: Yup.string().min(8).max(15).required(),
  });
  const { error, response } = useSelector((state) => state.logins);

  function onLogin(data) {
    dispatch(login(data));


  }
  useEffect(() => {

    if (response) {

      setUserSession(
        response.accessToken,
        response.user.username,
        response.refreshToken)
      props.history.push("/");

    } else if (error) {
      alert(error)

    }

  }, [error, response])

  return (
    <div className="login-container">
      <div className="color-line" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="back-link back-backend">
              <a href="index.html" className="btn btn-primary">
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" />
          <div className="col-md-4 col-md-4 col-sm-4 col-xs-12 box-login">
            <div className="text-center m-b-md custom-login">
              <h3>Đăng Nhập Quản Trị</h3>
              <p>DongHung.vn</p>
            </div>
            <div className="hpanel">
              <div className="panel-body">
                <Formik
                  initialValues={Initilvalue}
                  onSubmit={onLogin}
                  validationSchema={validationValue}
                >
                  <Form id="loginForm">
                    <div className="form-group">
                      <label className="control-label" htmlFor="username">
                        Username
                      </label>
                      <Field
                        type="text"
                        placeholder="username"
                        title="nhập username"
                        name="username"
                        id="username"
                        className="form-control"
                      />

                      <span className="help-block small">
                        <ErrorMessage name="username" component="erro-login" />
                      </span>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor="password">
                        Password
                      </label>
                      <Field
                        type="password"
                        title="password"
                        placeholder="password"
                        name="password"
                        id="password"
                        className="form-control"
                      />
                      <span className="help-block small">
                        <ErrorMessage name="password" component="erro-login" />
                      </span>
                    </div>
                    <div className="checkbox login-checkbox">
                      <label>
                        <input type="checkbox" className="i-checks" /> Remember
                        me{" "}
                      </label>
                      <p className="help-block small">
                        (if this is a private computer)
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success btn-block loginbtn"
                    >
                      Đăng nhập
                    </button>
                    <Link
                      to="/Register"
                      className="btn btn-outline-danger btn-block"
                    >
                      Register
                    </Link>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" />
        </div>
        <div className="row">
          <div className="col-md-12 col-md-12 col-sm-12 col-xs-12 text-center">
            <p>
              Copyright © 2018{" "}
              <a href="https://colorlib.com/wp/templates/">Colorlib</a> All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
