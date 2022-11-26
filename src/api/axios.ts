import axios from 'axios/index';

export const axiosInstance = axios.create({
  baseURL: 'https://submit.free.beeceptor.com',
});
