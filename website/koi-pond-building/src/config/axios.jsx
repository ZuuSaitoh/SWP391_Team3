import axios from "axios";
const baseUrl = "";

const config = {
    baseUrl: baseUrl,
};

const api = axios.create(config);

api.default.baseUrl = baseUrl;

//handle before call API
const handleBefore = (config) => {
    //handle hanh dong truoc khi call api
    //lay ra cai token va dinh kem voi request
    const token = localStorage.getItem("token")?.replaceAll('"',"");
    config.header["Authorization"] = `Bearer ${token}`;
    return config;
};

api.interceptors.request.use(handleBefore, null);

//handle after call API
export default api;