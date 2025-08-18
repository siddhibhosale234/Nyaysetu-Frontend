import axios from "axios";

export const baseBookURL = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
