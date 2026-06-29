import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getScans = () => API.get("/scans");

export const clearScans = () => API.delete("/scans");

export default API;
