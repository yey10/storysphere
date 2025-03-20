import axios from './api.js';

export const getAllUsers = async (filters={}) =>{
    try {
        const response = await axios.get('/users', { params: filters });
        return response.data;
    } catch (error) {
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
        const response = await axios.get('/users/profile');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const updateUserProfile = async (id, data) =>{
    try {
        const response = await axios.put(`/users/${id}/profile`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
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