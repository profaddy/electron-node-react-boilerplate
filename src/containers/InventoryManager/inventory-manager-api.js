import api from "../../utils/api";

export const fetchInventories = () => api.get(`/products`);

