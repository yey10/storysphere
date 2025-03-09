import axios from './api.js';

export const getAllStories = async () =>{
    try {
        const response = await axios.get('/stories');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getStoryById = async (id) =>{
    try {
        const response = await axios.get('/stories/${id}');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const createStory = async (storyData) =>{
    try{
        const response = await axios.post('/stories', storyData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const updateStory = async (id, storyData) =>{
    try {
        const response = await axios.post(`/stories/${id}`, storyData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const deleteStory = async (id) =>{
    try {
        const response = await axios.delete(`/stories/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getCategories = async () => {
    try {
        const response = await axios.get('stories/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error.response ? error.response.data : error;
    }
};
