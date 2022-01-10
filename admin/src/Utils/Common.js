// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem("accessToken") || null;
};
export const getRefReshToken = () => {
  return sessionStorage.getItem("refreshToken") || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("refreshToken");
};

// set the token and user from the session storage
export const setUserSession = (token, user, refreshToken) => {
  sessionStorage.setItem("accessToken", token);
  sessionStorage.setItem("user", user);
  sessionStorage.setItem("refreshToken", refreshToken);
};
export const setRefReshTokenSession = (token) => {
  sessionStorage.setItem("accessToken", token);
};
