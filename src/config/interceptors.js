import { LOADING_ROUTES_URL, STORAGE_KEY, STORE_URL_API } from "@/constants";
import { ERROR_CODE } from "@/constants/error";
import router from "@/routes";
import store from "@/store";
import storageUtils from "@/utils/storageUtils";
import axios from "axios";
import NProgress from "nprogress";

let refreshTokenRequest = null;
const baseURL = "https://admin.litinailhair.com/api/v1";
// const baseURL = "http://localhost:3003/api/v1";

const handlerRefreshToken = () => {
  return new Promise(function (resolve, reject) {
    const refreshToken = storageUtils.get(STORAGE_KEY.TOKEN_DATA)?.refreshToken;
    axios
      .post(`${baseURL}/auth/refresh-token`, {
        refreshToken: refreshToken,
      })
      .then(({ data }) => {
        resolve(data.data);
      })
      .catch((err) => {
        storageUtils.remove(STORAGE_KEY.TOKEN_DATA);
        router?.push("/login");
        reject(err);
      });
  });
};

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (LOADING_ROUTES_URL.includes(config.url) || config.url.includes(STORE_URL_API)) {
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
  async function (error) {
    const originalRequest = error.config;
    NProgress.done();
    store.commit("loading/setLoading", { isLoading: false });
    if (
      error?.response?.status == 401 &&
      error?.response?.data?.error !== ERROR_CODE.USER_NOT_FOUND
    ) {
      refreshTokenRequest = refreshTokenRequest
        ? refreshTokenRequest
        : handlerRefreshToken();
      const data = await refreshTokenRequest;
      refreshTokenRequest = null;
      const tokenData = storageUtils.get(STORAGE_KEY.TOKEN_DATA);
      storageUtils.set({
        key: STORAGE_KEY.TOKEN_DATA,
        data: {
          ...tokenData,
          accessToken: data.accessToken,
        },
      });
      originalRequest.headers.authorization = "Bearer " + data.accessToken;
      return axios(originalRequest);
    } else {
      const errorData = error?.response?.data;
      store.commit("error/setError", {
        message: errorData?.message,
        type: errorData?.error,
      });
    }
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
