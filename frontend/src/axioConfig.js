import axios from 'axios'

const axioApi = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout : 1000,
    withCredentials: true
})

export default axioApi