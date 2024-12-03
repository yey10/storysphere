import axios from './api.js';


export const register = async (data) =>{
    try {
        const response = await axios.post('/register', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const login = async (data) =>{
    try {
        const response = await axios.post('/login', data);
        //Guardar el token en el localStorage
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        } else {
            throw new Error('Token no encontrado en la respuesta del servidor');
        }
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const logout = () =>{
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    window.location.href='/';
}