import api from "../../utils/api";

export const fetchEntries = () => api.get(`/entries`);
