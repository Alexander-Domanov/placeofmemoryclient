import axios from 'axios';

export const authInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
});
