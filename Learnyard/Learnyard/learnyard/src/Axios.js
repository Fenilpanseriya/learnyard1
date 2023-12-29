import axios from "axios"
export const Axios=axios.create({
    baseURL:'http://localhost:6060/api/v1',
    withCredentials:true
})
