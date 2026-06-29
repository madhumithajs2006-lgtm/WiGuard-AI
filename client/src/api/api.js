import axios from "axios";

const api = axios.create({
  baseURL: "https://wiguard-ai.onrender.com",
});

export default api;
