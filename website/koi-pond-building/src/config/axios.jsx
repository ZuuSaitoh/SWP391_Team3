import axios from "axios";
const baseUrl = "";

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

api.interceptors.request.use(handleBefore, null);

export default api;