import axios from './api.js';

export const getAllCommentsByStory = async (storyId) =>{
    try {
        const response = await axios.get(`/comments/${storyId}/comment`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getCommentById= async (storyId) =>{
    try {
        const response = await axios.get(`/comments/${storyId}`);
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
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const updateComment = async (storyId, commentData) =>{
    try {
        const response = await axios.put(`/comments/${storyId}`, commentData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const deleteComment = async(storyId) =>{
    try {
        const response = await axios.delete(`/comments/${storyId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getCommentOwner = async (storyId) =>{
    try {
        const response = await axios.get(`/comments/${storyId}/owner`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}