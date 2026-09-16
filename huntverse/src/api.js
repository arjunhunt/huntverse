import axios from 'axios';

const hostname = window.location.hostname || 'localhost';
const api = axios.create({
  baseURL: `http://${hostname}:5000/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Automatically add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
