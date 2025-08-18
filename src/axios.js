import axios from "axios";

export const baseBookURL = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
