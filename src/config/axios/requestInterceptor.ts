import { axiosInstance } from "@/config/axios/axiosInstance";
import useAuthStore from "@/store/authStore";

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().isAuthenticated;
    if (token) {
      config.headers["Access-Control-Allow-Origin"] = "*";
    }

    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);
