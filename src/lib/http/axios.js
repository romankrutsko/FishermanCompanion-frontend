import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

http.interceptors.request.use(
  async (config) => {
    const data = JSON.parse(localStorage.getItem('fishing'))
    const token = data?.token
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default http;
