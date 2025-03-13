import { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { rateStory, getAverageRating, removeRating, getUserRating } from '../api/ratingsService.jsx';

const RatingsContext = createContext();

export const RatingsProvider = ({children}) =>{
    const [ratings, setRatings] = useState({});
    const [userRatings, setUserRatings] = useState({});

    const fetchRating = useCallback(async (storyId) => {
        const id = parseInt(storyId, 10);
        if (isNaN(id)) return;

        try {
            const average = await getAverageRating(id);
            const userRating = await getUserRating(id);
            setRatings((prev) => ({ ...prev, [id]: average ?? 0 }));
            setUserRatings((prev) => ({ ...prev, [id]: userRating }));
        } catch (error) {
            console.error("Error al obtener la calificación promedio:", error);
        }
    }, []);

    const handleRateStory = useCallback(async (storyId, rating) => {
        const id = parseInt(storyId, 10);
        if (isNaN(id) || rating < 1 || rating > 5) {
            console.error("Datos inválidos: storyId debe ser un número y rating debe estar entre 1 y 5.");
            return;
        }

        try {
            await rateStory(id, rating);
            setUserRatings((prev) => ({ ...prev, [id]: rating }));
            await fetchRating(id);
        } catch (error) {
            console.error("Error al calificar la historia:", error);
        }
    }, [fetchRating]);

    const handleRemoveRating = useCallback(async (storyId) => {
        const id = parseInt(storyId, 10);
        if (isNaN(id)) return;

        try {
            await removeRating(id);
            setUserRatings((prev) => {
                const newRatings = { ...prev };
                delete newRatings[id];
                return newRatings;
            });
            await fetchRating(id);
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