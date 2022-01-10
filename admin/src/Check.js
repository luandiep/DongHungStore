import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checktoken } from "./action/authTokenActions";
import { getRefReshToken, getToken } from "./Utils/Common";

export default function Check() {
  const dispatch = useDispatch();
  const token = getToken();
  const refreshtokens = getRefReshToken();
  useEffect(() => {
    if (token && refreshtokens) {
      dispatch(checktoken());
    }
  }, []);

  return <div></div>;
}
