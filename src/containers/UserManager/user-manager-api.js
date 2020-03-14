import api from "../../utils/api";

export const fetchUsers = () => api.get(`/users`);
// export const addEntry = (data) => api.post(`/entries`,data);

