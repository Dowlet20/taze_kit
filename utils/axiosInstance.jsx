import axios from 'axios';


// const baseUrl= 'http://kitap.edu:4000';
const baseUrl= 'http://192.168.55.140:4000';

const axiosInstance = axios.create({
  baseURL: baseUrl, 
  headers: {
    'Content-Type': 'application/json', 
  },
  timeout: 10000,
});




axiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
