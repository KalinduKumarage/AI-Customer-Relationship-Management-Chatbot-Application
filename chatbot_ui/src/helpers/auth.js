import { setCookie, getCookie, deleteCookie } from "./cookies";
import {
  deleteLocalStorage,
  getLocalStorage,
  setLocalStorage,
} from "./localStorage";

export const setUserAuthentication = (token, user) => {
  setCookie("token", token);
  setLocalStorage("user", user);
};

export const isUserAuthenticated = () => {
  if (getCookie("token") && getLocalStorage("user")) {
    return getLocalStorage("user");
  } else {
    return false;
  }
};

export const userLogout = () => {
  deleteCookie("token");
  deleteLocalStorage("user");
};
