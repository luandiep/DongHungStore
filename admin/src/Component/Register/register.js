import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
export default function Register() {
  const Initilvalue = {
    username: "",
    password: "",
  };

  const [Users, setUsers] = useState([]);

  const validationValue = Yup.object().shape({
    username: Yup.string().required("Không được bỏ trống"),
    password: Yup.string().min(8).max(15).required(),
  });

  function onSave(data) {
    axios
      .post("http://localhost:3001/api/auth/register", data)
      .then((response) => {
        setUsers(response.data);
        alert("Thêm thành công");
      });
  }
  return (
    <div>
      <h2>Thêm người dùng</h2>
      <Formik
        initialValues={Initilvalue}
        onSubmit={onSave}
        validationSchema={validationValue}
      >
        <Form className="formContainer">
          <div className="row box-right">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="review-content-section">
                <div className="Field-group mg-b-pro-edt">
                  <span className="Field-group-addon">
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                  </span>
                  <Field
                    type="text"
                    className="form-control"
                    placeholder="nhập tên user"
                    name="username"
                  />
                </div>
                <ErrorMessage name="username" component="erro" />
              </div>
              <div className="review-content-section">
                <div className="Field-group mg-b-pro-edt">
                  <span className="Field-group-addon">
                    <i class="fa fa-user-o" aria-hidden="true"></i>
                  </span>
                  <Field
                    type="password"
                    autocomplete="off"
                    className="form-control"
                    placeholder="nhập mật khẩu"
                    name="password"
                  />
                </div>
                <ErrorMessage name="password" component="erro" />
              </div>

              <button type="submit" className="btn btn-primary">
                Đăng ký
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
