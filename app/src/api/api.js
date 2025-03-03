import axios from  'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';


axios.interceptors.request.use(
    config =>{
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);




//interceptor para manejar respuestas

axios.interceptors.response.use(
    response => response,
    error =>{
        //redirigir a la página de login si el token ha expirado

        if (error.response && error.response.status === 401) {
            sessionStorage.removeItem('token');
            window.location.href = '/login';
    }
    return Promise.reject(error);

    }
);


export default axios;