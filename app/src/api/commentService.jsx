import axios from './api.js';

export const getCommentById= async (storyId) =>{
    try {
        const response = await axios.get(`/comments/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const createComment = async (storyId, commentData) =>{
    try {
        const response = await axios.post(`/comments/${storyId}`, commentData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const updateComment = async (id, commentData) =>{
    try {
        const response = await axios.put(`/comments/${id}`, commentData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const deleteComment = async(id) =>{
    try {
        const response = await axios.delete(`/comments/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getCommentOwner = async (id) =>{
    try {
        const response = await axios.get(`/comments/${id}/owner`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}