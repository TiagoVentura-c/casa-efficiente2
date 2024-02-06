import axios from "axios"
import Cookies from "js-cookie";


export const BASE_URL = 'http://localhost:8080' 

export default function apiManager(requireToken: boolean = true){

const api = axios.create({
    baseURL: BASE_URL,
    responseType: 'json',
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use( async config => {
    config.timeout = 10000

    if (requireToken) {
        const access_token = Cookies.get('access_token')

        config.headers.Authorization = `Bearer ${access_token}`;
        return config;
    }else{
        return config
    }

});

api.interceptors.response.use(response => {
    // Hide the loader
    // context.hideLoader()
    return response
}, async error => {
        if (error.response?.data) {
            throw error.response?.data.ErrorDescription
        }
    throw error
})

return api

}
