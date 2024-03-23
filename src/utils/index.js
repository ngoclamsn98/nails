export const getToken = () => {
  if (typeof window != undefined) {
    return window.localStorage.getItem("token");
  }
  return null;
};

export const setToken = (token) => {
  if (typeof window != undefined) {
    return window.localStorage.setItem("token", JSON.stringify(token));
  }
  return null;
};
