import axios from "axios";
const baseUrl = "http://localhost:8080/customers/create";

const config = {
    baseUrl: baseUrl,
};

const api = axios.create(config);

api.defaults.baseUrl = baseUrl;

const handleBefore = (config) => {
    const token = localStorage.getItem("token")?.replaceAll('"', "");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
};
const handleError = (error) => {
    console.log(error);
}

api.interceptors.request.use(handleBefore, handleError);

export default api;