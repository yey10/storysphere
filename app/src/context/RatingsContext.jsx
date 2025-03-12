import { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { rateStory, getAverageRating, removeRating } from '../api/ratingsService.jsx';

const RatingsContext = createContext();

export const RatingsProvider = ({children}) =>{
    const [ratings, setRatings] = useState({});
    const [userRatings, setUserRatings] = useState({});

    const fetchRating = useCallback(async (storyId) =>{

        if (!storyId || isNaN(storyId)) return;

        try {
            const average = await getAverageRating(storyId);
            setRatings((prev) => ({ ...prev, [storyId]: average}));
        } catch (error) {
            console.error("Error al obtener la calificación promedio:", error);
        }
    }, []);

    const handleRateStory = useCallback(async (storyId, rating) =>{

         if (!storyId || isNaN(storyId) || rating < 1 || rating > 5) {
            console.error("Datos inválidos: storyId debe ser un número y rating debe estar entre 1 y 5.");
            return;
        }

        try {
            await rateStory(storyId, rating);
            setUserRatings((prev) => ({ ...prev, [storyId]: rating}));
            fetchRating(storyId);
        } catch (error) {
            console.error("Error al calificar la historia:", error);
        }
    }, [fetchRating]);

    const handleRemoveRating = useCallback(async (storyId) =>{
        if (!storyId) return;
        try {
            await removeRating(storyId);
            setUserRatings((prev) => {
                const newRatings = { ...prev };
                delete newRatings[storyId];
                return newRatings;
            });
            fetchRating(storyId);
        } catch (error) {
            console.error("Error al eliminar la calificación:", error);
        }
    }, [fetchRating]);

    const contextValue = useMemo(() => ({
        ratings,
        userRatings,
        fetchRating,
        handleRateStory,
        handleRemoveRating
    }), [ratings, userRatings, fetchRating, handleRateStory, handleRemoveRating]);


    return (
        <RatingsContext.Provider value={
            contextValue
        }>
            {children}
        </RatingsContext.Provider>
    );
};

export const useRatings = () => useContext(RatingsContext);