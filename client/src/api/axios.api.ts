import axios from 'axios';

axios.defaults.withCredentials = true;

export const instance = axios.create({
  baseURL: 'https://family-tree-3beq.onrender.com',
});
