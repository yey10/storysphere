import axios from './api.js';


export const register = async (data) =>{
    try {
        const response = await axios.post('/register', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const login = async (data, config ={}) =>{
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);


    try {
        const response = await axios.post('/login', data,{
            signal: controller.signal,
            ...config
        });
        //Guardar el token en el localStorage
        if (response.data.access_token) {
            sessionStorage.setItem('token', response.data.access_token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
        } else {
            throw new Error('Token no encontrado en la respuesta del servidor');
        }
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
        console.log("Error en login:", error.response); 
    }finally{
        clearTimeout(timeoutId);
    }
}

export const logout = () =>{
    sessionStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    window.location.href='/';
}