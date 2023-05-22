import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://mashedbot-ai.onrender.com",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
