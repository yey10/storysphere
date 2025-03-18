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

            // Contar cuántos son likes y cuántos son favoritos
            const likeCount = interactions.filter(i => i.interaction_type.includes("like")).length;
            const favoriteCount = interactions.filter(i => i.interaction_type.includes("favorite")).length;

            setLikes(prev => ({ ...prev, [storyId]: likeCount }));
            setFavorites(prev => ({ ...prev, [storyId]: favoriteCount }));

            // Verificar si el usuario actual ya interactuó con la historia
            const userInteraction = interactions.find(i => i.id_user === user?.id);
            setUserInteractions(prev => ({
                ...prev,
                [storyId]: userInteraction?.interaction_type || null
            }));
        } catch (error) {
            console.error("Error al obtener interacciones:", error);
        }
    }, [user]);

    // Alternar like/favorito
    const handleToggleInteraction = useCallback(async (storyId, type) => {
        if (!storyId || !type) return;

        try {
            const currentInteraction  = userInteractions[storyId] || null;
            await toggleInteraction(storyId, type);

            let newLikes = likes[storyId] || 0;
            let newFavorites = favorites[storyId] || 0;
            let newUserInteraction = null;

            if (currentInteraction === type) {
                // Si ya existe la interacción, la eliminamos
                if (type === "like") newLikes--;
                if (type === "favorite") newFavorites--;
            } else if (currentInteraction === 'both') {
                // Si el usuario tenía ambos y quita uno, deja el otro
                newUserInteraction = type === "like" ? "favorite" : "like";
                if (type === "like") newLikes--;
                if (type === "favorite") newFavorites--;
            } else {
                // Si no existe la interacción, la agregamos
                newUserInteraction = currentInteraction ? "both" : type;
                if (type === "like") newLikes++;
                if (type === "favorite") newFavorites++;
            }

            // Actualizar estados
            setLikes(prev => ({ ...prev, [storyId]: Math.max(newLikes, 0) }));
            setFavorites(prev => ({ ...prev, [storyId]: Math.max(newFavorites, 0) }));
            setUserInteractions(prev => ({ ...prev, [storyId]: newUserInteraction }));

        } catch (error) {
            console.error(`Error al alternar ${type}:`, error);
        }
    }, []);

    // Cargar los likes de todas las historias cuando se monta el componente
    useEffect(() => {
        const fetchAllInteractions  = async () => {
            try {
                const stories = await getAllStories();
                if (!stories || stories.length === 0) return;

                const interactionsData  = {};
                await Promise.all(
                    stories.map(async (story) => {
                        const interactions = await getStoryInteractions(story.id_story);

                        const likeCount = interactions.filter(i => i.interaction_type.includes("like")).length;
                        const favoriteCount = interactions.filter(i => i.interaction_type.includes("favorite")).length;

                        interactionsData[story.id_story] = {
                            likes: likeCount,
                            favorites: favoriteCount
                        };
                    })
                );

                setLikes(Object.fromEntries(Object.entries(interactionsData).map(([id, data]) => [id, data.likes])));
                setFavorites(Object.fromEntries(Object.entries(interactionsData).map(([id, data]) => [id, data.favorites])));
            } catch (error) {
                console.error("Error fetching all likes:", error);
            }
        };

        fetchAllInteractions();
    }, []);

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
