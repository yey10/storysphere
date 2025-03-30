import axios from './api.js';

export const toggleInteraction = async (storyId, interactionType) => {
    try {
        const response = await axios.put(`/interactions/${storyId}`, { interaction_type: interactionType });
        return response.data;
    }catch (error){
        console.error(`Error al cambiar la interacción (${interactionType}):`, error);
        throw new Error(`Error al cambiar la interacción (${interactionType})`);
    }
}

export const getStoryInteractions = async (storyId) => {
    try {
        const response = await axios.get(`/interactions/${storyId}/count`);
        console.log(`Datos de la API para story ${storyId}:`, response.data);
        return response.data.interactions;
    }catch (error){
        console.error("Error al obtener interacciones de la historia:", error);
        throw new Error("Error al obtener interacciones de la historia");
    }
}

