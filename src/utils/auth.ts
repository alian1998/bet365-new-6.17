import Cookies from "js-cookie";

export const logout = () => {
  localStorage.removeItem("gameToken");
  Cookies.remove("gameToken");
  window.location.href = "/";
  window.location.reload();
};
