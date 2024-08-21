import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
});

const apiClientPrivate = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
const queryClient = new QueryClient();

export { apiClient, queryClient, apiClientPrivate };
