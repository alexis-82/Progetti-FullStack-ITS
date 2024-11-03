const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  catalog: `${API_BASE_URL}/catalog/items`,
  catalogItem: (id) => `${API_BASE_URL}/catalog/items/${id}`,
  basket: `${API_BASE_URL}/basket`,
  order: `${API_BASE_URL}/order`,
};

export default API_BASE_URL; 