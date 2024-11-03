import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

// Configurazione globale di axios
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Aggiungi interceptor per logging
axios.interceptors.request.use(request => {
  console.log('Request URL:', request.url);
  console.log('Request Method:', request.method);
  console.log('Request Headers:', request.headers);
  return request;
});

axios.interceptors.response.use(
  response => {
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);
    console.log('Response Data:', response.data);
    return response;
  },
  error => {
    console.error('Errore API:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const catalogService = {
  getProducts: () => axios.get(API_ENDPOINTS.catalog),
  getProduct: (id) => axios.get(API_ENDPOINTS.catalogItem(id))
};

export const inventoryService = {
  getInventory: () => axios.get(API_ENDPOINTS.inventory),
  getProductInventory: (id) => axios.get(`${API_ENDPOINTS.inventory}/${id}`)
};

export const basketService = {
  addItem: (item) => axios.post(`${API_ENDPOINTS.basket}/add`, item),
  removeItem: (id) => axios.delete(`${API_ENDPOINTS.basket}/${id}`),
  updateQuantity: (id, quantity) => axios.put(`${API_ENDPOINTS.basket}/${id}`, { quantity })
};

export const orderService = {
  createOrder: (orderData) => axios.post(`${API_ENDPOINTS.order}/create`, orderData),
  getOrders: () => axios.get(API_ENDPOINTS.order)
};