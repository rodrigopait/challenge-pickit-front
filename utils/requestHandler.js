import axios from "axios";
import errorHandler from "./errorHandler";

axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export const requests = {
  get: async (url, params) => {
    try {
      let response = await axios(url, {
        method: "get",
        baseURL: process.env.VUE_APP_API_BASE_URL,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        ...params,
      });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(errorHandler(error.response));
    }
  },
  post: async (url, params) => {
    try {
      let response = await axios(url, {
        method: "post",
        baseURL: process.env.VUE_APP_API_BASE_URL,
        // headers: {
        //   Accept: "application/json",
        //   "Content-Type": "application/json",
        // },
        data: params,
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(errorHandler(error.response));
    }
  },
  put: async (url, params) => {
    try {
      let response = await axios(url, {
        method: "put",
        baseURL: process.env.VUE_APP_API_BASE_URL,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: params,
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(errorHandler(error.response));
    }
  },
  delete: async (url) => {
    try {
      let response = await axios(url, {
        method: "delete",
        baseURL: process.env.VUE_APP_API_BASE_URL,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(errorHandler(error.response));
    }
  },
  postFile: async (url, params) => {
    try {
      let response = await axios(process.env.VUE_APP_API_BASE_URL + url, {
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        data: params,
      });
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(errorHandler(error.response));
    }
  },
};
