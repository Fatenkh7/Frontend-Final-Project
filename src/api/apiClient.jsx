import axios from "axios";

const baseURL = "http://localhost:8000/";

const axiosClient = axios.create({
  baseURL
});

axiosClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
    }
  };
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) return response.data;
  return response;
}, (err) => {
  throw err.response.data;
});

export default axiosClient;
