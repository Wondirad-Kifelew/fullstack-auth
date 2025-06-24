import axios from "axios";
// const api = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE === "production"
    ? `https://fullstack-auth-o3vq.onrender.com`
    : 'http://localhost:5000',
    withCredentials:true
})

export default axiosInstance