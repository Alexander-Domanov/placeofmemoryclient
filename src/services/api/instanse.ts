import axios from 'axios';
import { ResMe } from '@/types';

export const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
});

export const meSendRequest = async () => {
  const res = await authInstance.get<ResMe>('auth/me');

  return res.data;
};
authInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'accessToken'
    )}`;

    return config;
  },
  (error) => Promise.reject(error)
);

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      !originalRequest._isRetry &&
      error?.response?.data?.statusCode === 401
    ) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/update-tokens`,
          {},
          { withCredentials: true }
        );

        localStorage.setItem('accessToken', response.data?.accessToken);
        originalRequest.headers.Authorization = `Bearer ${response.data?.accessToken}`;

        return await authInstance(originalRequest);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
      }
    }

    return Promise.reject(error);
  }
);
