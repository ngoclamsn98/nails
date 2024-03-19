import axios from "axios";
import { globalRouter } from "../routes/globalRouter";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  function (config) {
    const token = this.$store.state.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    if (error.response.status == 401) {
      globalRouter.router?.push("/");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
