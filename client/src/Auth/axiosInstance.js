import axios from "axios";

const axiosInstance = axios.create({
    // http://localhost:5000
    baseURL:'',
    withCredentials:true
})

export default axiosInstance