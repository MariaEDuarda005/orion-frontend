import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://orion-backend-5vt5.onrender.com",
});

export default api;