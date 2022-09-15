import axios from "axios";

console.log(process.env.VUE_APP_API,'1');
const AxiosClient = axios.create({
    baseURL: process.env.VUE_APP_API,
})
export default AxiosClient;