import axios from "axios";

export const apiClient = axios.create({
  // URL para variable de entorno
  baseURL: "https://institutodelnorte.onrender.com/"
  // baseURL: "http://127.0.0.1:8000"
});