import axios from "axios";
const baseUrl = "http://14.225.220.131:8080/api/";

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