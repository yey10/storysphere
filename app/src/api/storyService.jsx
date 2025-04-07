import axios from './api.js';

const handleError = (error) => {
    throw error.response ? error.response.data : error;
};

export const getAllStories = async () => {
    try {
        const response = await axios.get('/stories');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getStoryById = async (id) => {
    try {
        const response = await axios.get(`/stories/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createStory = async (storyData) => {
    try {
        const response = await axios.post('/stories', storyData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateStory = async (id, storyData) => {
    try {
        const response = await axios.put(`/stories/${id}`, storyData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data.story;
    } catch (error) {
        handleError(error);
    }
};

export const deleteStory = async (id) => {
    try {
        const response = await axios.delete(`/stories/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getCategories = async () => {
    try {
        const response = await axios.get('/stories/categories');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getUserStories = async (userId) => {
    try {
        const response = await axios.get(`/users/${userId}/stories`);
        return response.data.stories;
    } catch (error) {
        handleError(error);
    }
};

export const updateStoryStatus = async (id, data) => {
    try {
        const response = await axios.put(`/stories/${id}/status`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
