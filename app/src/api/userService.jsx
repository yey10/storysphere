import axios from './api.js';

export const getAllUsers = async (filters={}) =>{
    try {
        const response = await axios.get('/users', { params: filters });
        console.log("Respuesta completa de la API:", response.data);
        return response.data.users.data;
    } catch (error) {
        console.error("Error en getAllUsers():", error);
        throw error.response ? error.response.data : error;
    }
}

export const getUserById = async (id) =>{
    try {
        const response = await axios.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getUserProfile = async () =>{
    try {
        const response = await axios.get('/profile');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const updateUserProfile = async (user, data) =>{
    try {
        const response = await axios.put(`/profile/${user}`, data, {
            headers: {
                'Content-Type': 'application/json',
              },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const deleteUserAccount = async (id) =>{
    try {
        const response = await axios.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const updateUserRole = async (id, data) =>{
    try {
        const response = await axios.put(`/users/${id}/role`, data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}