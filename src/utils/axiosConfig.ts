import { ResponseSuccessType } from "@/types/common";
import { baseUrl } from "./api";
import { logout } from "./auth";
import { getGameToken } from "./token";
import axios from "axios";

export type IGenericErrorResponse = {
  statusCode?: number;
  message?: string;
  success?: string;
  errorMessages?: IGenericErrorMessage[];
};
export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

const axiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use((config) => {
  const token = getGameToken();
  // console.log(token, "token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function (response): any {
    // console.log(response, "response from axios instance");
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
      success: response?.data?.success,
    };
    return responseObject;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      logout();
    }
    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.status || 500,
      message: error?.response?.data?.message || "Something went wrong",
      errorMessages: error?.response?.data?.errorMessages,
      success: error?.response?.data?.success,
    };
    // return responseObject;
    return Promise.reject(responseObject);
  }
);

export default axiosInstance;
