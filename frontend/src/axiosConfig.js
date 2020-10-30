import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'localhost:5000/api/',
    timeout: 10000,
    withCredentials: true
});

export default axiosApi