import axios, { AxiosAdapter } from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

const axiosApi = axios.create({
  baseURL: "https://newsapi.org/v2",
  adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter),
});

axiosApi.interceptors.request.use(
  function (config: any) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // window.location.href = "/404";
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosApi;
