import axios from  'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['X-Requested-With'] = ['XMLHttpRequest'];
const token = localStorage.getItem('token');

if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

axios.defaults.headers.common['Accept'] = 'application/json';


//interceptor para manejar respuestas

axios.interceptors.response.use(
    response => response,
    error =>{
        //redirigir a la página de login si el token ha expirado

        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
    }

    return Promise.reject(error);

    }
);


export default axios;