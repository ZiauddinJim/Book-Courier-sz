import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'https://book-courier-server-sz.vercel.app'
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;