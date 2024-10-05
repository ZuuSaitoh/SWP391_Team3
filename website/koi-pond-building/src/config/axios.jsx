import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Your backend URL
  // baseURL: '/',
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  withCredentials: true,
});

export default api;
