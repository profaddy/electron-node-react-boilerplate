import api from "../../utils/api";

export const fetchEntries = () => api.get(`/entries`);
export const addEntry = (data) => api.post(`/entries`,data);

