import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://submit.free.beeceptor.com',
});
