import axios from "axios";
// const api = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
    // http://localhost:5000
    baseURL:`https://fullstack-auth-o3vq.onrender.com`,
    withCredentials:true
})

export default axiosInstance