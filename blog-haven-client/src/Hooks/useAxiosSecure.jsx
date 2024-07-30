import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://blog-haven-server.vercel.app', 
    withCredentials: true
});

const useAxiosSecure = () => {

    const { logOut } = useAuth();
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token')
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log(status)
        if (status === 401 || status === 403) {
            await logOut();
        }
        return Promise.reject(error);
    })


    return axiosSecure;
};

export default useAxiosSecure;