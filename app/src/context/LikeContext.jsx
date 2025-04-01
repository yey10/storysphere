import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toggleInteraction, getStoryInteractions } from '../api/likeService';
import { getAllStories } from '../api/storyService';
import { useAuth } from './AuthContext';

const LikeContext = createContext();


export const LikeProvider = ({ children }) => {
    const { user } = useAuth();
    const [likes, setLikes] = useState({});
    const [favorites, setFavorites] = useState({});
    const [userInteractions, setUserInteractions] = useState({});

    // Cargar interacciones de una historia específica
    const fetchInteractions = useCallback(async (storyId) => {
        if (!storyId) return;
        try {
            const interactions  = await getStoryInteractions(storyId);

            console.log(`Interacciones para historia ${storyId}:`, interactions);

            // Contar cuántos son likes y cuántos son favoritos
            const likeCount = interactions.filter(i => i.interaction_type === "like").length;
            const favoriteCount = interactions.filter(i => i.interaction_type === "favorite").length;

            setLikes(prev => ({ ...prev, [storyId]: likeCount }));
            setFavorites(prev => ({ ...prev, [storyId]: favoriteCount }));

            // Verificar si el usuario actual ya interactuó con la historia
            const userInteractionsMap = { ...userInteractions }; // Copia estado actual

            interactions.forEach(interaction => {
                if (interaction.id_user === user?.id) {
                    userInteractionsMap[interaction.id_story] = interaction.interaction_type;
                }
            });

            setUserInteractions(userInteractionsMap);
        } catch (error) {
            console.error("Error al obtener interacciones:", error);
        }
    }, [user]);

    // Alternar like/favorito
    const handleToggleInteraction = useCallback(async (storyId, type) => {
        if (!storyId || !type) return;
    
        try {
            const currentInteraction = userInteractions[storyId] || null; // Estado actual
            await toggleInteraction(storyId, type);
    
            // Determinar el nuevo estado basado en la interacción actual
            let newInteraction = null;
    
            if (!currentInteraction) {
                newInteraction = type; // Si no había interacción, asignamos el nuevo tipo
            } else if (currentInteraction === type) {
                newInteraction = null; // Si ya tenía esta interacción, la eliminamos
            } else {
                newInteraction = "both"; // Si tenía "like" y ahora agrega "favorite", es "both"
            }
    
            // Actualizar los contadores de likes y favoritos
            const newLikes = type === "like" 
                ? (newInteraction === "like" || newInteraction === "both" ? likes[storyId] + 1 : likes[storyId] - 1) 
                : likes[storyId];
    
            const newFavorites = type === "favorite" 
                ? (newInteraction === "favorite" || newInteraction === "both" ? favorites[storyId] + 1 : favorites[storyId] - 1) 
                : favorites[storyId];
    
            setLikes(prev => ({ ...prev, [storyId]: Math.max(newLikes, 0) }));
            setFavorites(prev => ({ ...prev, [storyId]: Math.max(newFavorites, 0) }));
    
            setUserInteractions(prev => ({
                ...prev,
                [storyId]: newInteraction
            }));
    
        } catch (error) {
            console.error(`Error al alternar ${type}:`, error);
        }
    }, [likes, favorites, userInteractions]);

    // Cargar los likes de todas las historias cuando se monta el componente
    useEffect(() => {
        const fetchAllInteractions  = async () => {
            try {
                const stories = await getAllStories();
                if (!stories || stories.length === 0) return;

                const likesData = {};
                const favoritesData = {};
                const userInteractionsData = {};
                
                await Promise.all(
                    stories.map(async (story) => {
                        const interactions = await getStoryInteractions(story.id_story);

                        const likeCount = interactions.filter(i => i.interaction_type === "like").length;
                        const favoriteCount = interactions.filter(i => i.interaction_type === "favorite").length;


                        likesData[story.id_story] = likeCount;
                        favoritesData[story.id_story] = favoriteCount;

                        interactions.forEach(interaction => {
                            if (interaction.id_user === user?.id) {
                                userInteractionsData[story.id_story] = interaction.interaction_type;
                            }
                        });
                    })
                );

                setLikes(likesData);
                setFavorites(favoritesData);
                setUserInteractions(userInteractionsData);

            } catch (error) {
                console.error("Error fetching all likes:", error);
            }
        };

         if (user) fetchAllInteractions();
    }, [user]);

    return (
        <LikeContext.Provider value={{
            likes,
            favorites,
            handleToggleInteraction,
            fetchInteractions,
            userInteractions
        }}>
            {children}
        </LikeContext.Provider>
    );
};

export const useLikes = () => useContext(LikeContext);
