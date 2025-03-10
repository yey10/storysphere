import axios from './api.js';

export const toggleLike = async (storyId) => {
    try {
        const response = await axios.put(`/likes/${storyId}`);
        return response.data;
    }catch (error){
        console.error("Error al dar like a la historia:", error);
        throw new Error("Error al dar like a la historia");
    }
}

export const getStoryLikes = async (storyId) => {
    try {
        const response = await axios.get(`/likes/${storyId}/count`);
        return response.data.likes;
    }catch (error){
        console.error("Error al obtener los likes de la historia:", error);
        throw new Error("Error al obtener los likes de la historia");
    }
}

