import axios from './api.js';

export const rateStory = async (storyId, rating) =>{

    if(!storyId || isNaN(storyId) || rating < 1 || rating > 5){
        throw { message: "Datos inválidos: storyId debe ser un número y rating debe estar entre 1 y 5."
    };}

    try {
        const response = await axios.post('/ratings', {id_story: storyId, rating});
        return response.data;
    } catch (error) {
        console.error("Error al calificar la historia:", error);
        throw new Error("No se pudo calificar la historia.");
    }
};

export const getAverageRating = async (storyId) =>{
    
    if (!storyId || isNaN(storyId)) {
        throw { message: "Datos inválidos: storyId debe ser un número." };
    }
    try {
        const response = await axios.get(`/ratings/${storyId}/average`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la calificación promedio:", error);
        throw new Error("No se pudo obtener la calificación promedio.");
    }
};

export const removeRating = async (storyId) =>{

    if (!storyId || isNaN(storyId)) {
        throw { message: "Datos inválidos: storyId debe ser un número." };
    }

    try {
        await axios.delete(`/ratings/${storyId}`);
    } catch (error) {
        console.error("Error al eliminar la calificación:", error);
        throw new Error("No se pudo eliminar la calificación.");
    }
}