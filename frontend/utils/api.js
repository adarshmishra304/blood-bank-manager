import axios from "axios";

  const API = axios.create({
    baseURL: import.meta.env.URL || "http://localhost:5000/api",
    withCredentials: true, // if you're using cookies for auth
  });
  
  API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  export default API;

  // blood 
  export const requestBlood = (data) => API.post("/blood/request", data);
  export const addBlood = (data) => API.post("/blood/add", data);
  export const getInventory = () => API.get("/blood");
  export const getBloodStats = () => API.get("/blood/stats");

  // profile
  export const getUserProfile = () => API.get("/private/profile");

  // auth
  export const login = (data) => API.post("/auth/login", data);
  export const register = (data) => API.post("/auth/register", data);
  export const getProfile = () => API.get("/auth/profile");