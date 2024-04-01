import router from "@/routes";
import store from "@/store";
import storageUtils from "@/utils/storageUtils";
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config) {
    store.commit("loading/setLoading", { isLoading: true });
    const token = storageUtils.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    store.commit("loading/setLoading", { isLoading: false });

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (config) {
    store.commit("loading/setLoading", { isLoading: false });
    return config;
  },
  function (error) {
    store.commit("loading/setLoading", { isLoading: false });
    if (error.response.status == 401) {
      storageUtils.remove("token");
      router?.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
