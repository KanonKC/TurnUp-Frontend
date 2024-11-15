import axios from "axios"

export const BACKEND_URL = import.meta.env.VITE_BACKEND_SERVER_URL // String(import.meta.env.VITE_BACKEND_URL);

export const backendUrl = axios.create({
    baseURL: BACKEND_URL
})