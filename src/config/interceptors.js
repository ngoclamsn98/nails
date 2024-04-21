import router from "@/routes";
import store from "@/store";
import storageUtils from "@/utils/storageUtils";
import axios from "axios";
import { STORAGE_KEY, LOADING_ROUTES_URL } from "@/constants";
import NProgress from "nprogress";

const axiosInstance = axios.create({
  baseURL: "http://45.251.114.224:3004/api/v1",
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (LOADING_ROUTES_URL.includes(config.url)) {
      store.commit("loading/setLoading", { isLoading: true });
    } else {
      NProgress.start();
      NProgress.set(1);
    }
    const userToken = storageUtils.get(STORAGE_KEY.TOKEN_DATA)?.accessToken;
    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    }
    return config;
  },
  function (error) {
    NProgress.done();
    store.commit("loading/setLoading", { isLoading: false });
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (config) {
    store.commit("loading/setLoading", { isLoading: false });
    NProgress.done();
    return config;
  },
  function (error) {
    NProgress.done();
    store.commit("loading/setLoading", { isLoading: false });
    const errorData = error?.response?.data;
    store.commit("error/setError", {
      message: errorData.message,
      type: errorData.error,
    });
    // if (error.response.status == 401 || error.response.status == 403) {
    //   storageUtils.remove(STORAGE_KEY.TOKEN_DATA);
    //   router?.push("/login");
    // }
    return Promise.reject(error);
  }
);

export const handlerCallApi = async ({ url, method, body, params }) => {
  const result = await axiosInstance({
    url: url,
    method: method,
    data: body,
    params: params,
  });
  return result?.data?.data;
};

export default axiosInstance;
