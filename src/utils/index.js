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

export const removeToken = () => {
  if (typeof window != undefined) {
    return window.localStorage.removeItem("token");
  }
  return null;
};

export const getStore = () => {
  if (typeof window != undefined) {
    return window.sessionStorage.getItem("store");
  }
  return null;
};

export const setStore = (store) => {
  if (typeof window != undefined) {
    return window.sessionStorage.setItem("token", JSON.stringify(store));
  }
  return null;
};
