import axios from "axios";

export const apiClient = axios.create({
  // URL para variable de entorno
  // baseURL: "https://institutodelnorte.onrender.com"
  baseURL: "http://127.0.0.1:8000"
});

export const cementery_type1="Parque"
export const cementery_type2="Municipal"

export const tombstone_type1="Placa"
export const tombstone_type2="Lápida"