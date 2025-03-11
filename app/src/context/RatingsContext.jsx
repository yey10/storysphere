import { createContext, useState, useContext, useEffect, useCallback, Children } from 'react';
import { rateStory, getAverageRating, removeRating } from '../api/ratingsService';

const RatingsContext = createContext();

export const RatingsProvider = ({children}) =>{
    const [ratings, setRatings] = useState({});
    const [userRatings, setUserRatings] = useState({});

    const fetchRating = useCallback(async (storyId) =>{
        if (!storyId) return;
        try {
            const average = await getAverageRating(storyId);
            setRatings((prev) => ({ ...prev, [storyId]: average}));
        } catch (error) {
            console.error("Error al obtener la calificación promedio:", error);
        }
    }, []);

    const handleRateStory = useCallback(async (storyId, rating) =>{
        if (!storyId) return;
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


    return (
        <RatingsContext.Provider value={{
            ratings,
            userRatings,
            fetchRating,
            handleRateStory,
            handleRemoveRating
        }}>
            {children}
        </RatingsContext.Provider>
    );
};

export const useRatings = () => useContext(RatingsContext);