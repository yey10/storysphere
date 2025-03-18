import axios from './api.js';

export const requestPasswordReset = async (email) =>{
    try {
        const response = await axios.post('/forgot-password', {email});
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const resetPassword = async (data) =>{
    try {
        const response = await axios.post('/reset-password', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}