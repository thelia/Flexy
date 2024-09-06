import axios, { AxiosRequestConfig } from "axios";

export const ApiInstance = axios.create({
  baseURL: "/api/front",
  headers: {
    "Content-Type": "application/json",
  },
});

ApiInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

export const fetcher = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await ApiInstance.request<T>({
      url,
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
