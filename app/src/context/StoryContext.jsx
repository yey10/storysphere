import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
    getAllStories, createStory, updateStory, updateStoryStatus,
    deleteStory, getCategories, getStoryById, getUserStories
} from '../api/storyService.jsx';
import { useLikes } from './LikeContext.jsx';

const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
    const [stories, setStories] = useState([]);
    const [userStories, setUserStories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { likes } = useLikes();

    const fetchStories = useCallback(async (forceReload = false) => {
        if (!forceReload && stories.length > 0) return;
        setIsLoading(true);
        try {
            const data = await getAllStories();
            setStories(data);
        } catch (error) {
            console.error("Error al obtener historias:", error);
        } finally {
            setIsLoading(false);
        }
    }, [stories]);

    const fetchCategories = useCallback(async () => {
        if (categories.length > 0) return;
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
        }
    }, [categories]);

    const fetchUserStories = useCallback(async (userId) => {
        if (!userId) return console.error("userId no proporcionado");
        setIsLoading(true);
        try {
            const data = await getUserStories(userId);
            setUserStories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al obtener historias del usuario:", error);
            setUserStories([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            try {
                const [storiesData, categoriesData] = await Promise.all([
                    getAllStories(), getCategories()
                ]);
                setStories(storiesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error al obtener historias o categorías:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialData();
    }, []);

    const addStory = async (storyData) => {
        try {
            const newStory = await createStory(storyData);
            setStories(prev => [...prev, newStory]);
        } catch (error) {
            console.error("Error al crear la historia:", error);
        }
    };

    const getStory = async (id) => {
        try {
            return await getStoryById(id);
        } catch (error) {
            console.error("Error al obtener la historia:", error);
            throw error;
        }
    };

    const editStory = async (id, updatedData) => {
        try {
            const updatedStory = await updateStory(id, updatedData);
            if (!updatedStory || !updatedStory.id_story)
                throw new Error("Respuesta inválida del backend");

            const updateInList = list =>
                list.map(story => story.id_story === id ? { ...story, ...updatedStory } : story);

            setStories(prev => updateInList(prev));
            setUserStories(prev => updateInList(prev));

            return updatedStory;
        } catch (error) {
            console.error("Error al editar la historia:", error);
            throw error;
        }
    };

    const changeStoryStatus = async (id, data) => {
        try {
            const { story: updatedStory } = await updateStoryStatus(id, data);
            if (!updatedStory) throw new Error("No se pudo actualizar el estado");

            setStories(prev =>
                prev.map(story =>
                    story.id_story === id ? { ...story, state: updatedStory.state } : story
                )
            );

            return updatedStory;
        } catch (error) {
            console.error("Error al cambiar el estado:", error);
            throw error;
        }
    };

    const removeStory = async (id) => {
        try {
            await deleteStory(id);
            const filterStories = list => list.filter(story => story.id_story !== id);
            setStories(prev => filterStories(prev));
            setUserStories(prev => filterStories(prev));
        } catch (error) {
            console.error("Error al eliminar la historia:", error);
        }
    };

    const getFeaturedStories = (limit = 5) => {
        return [...stories]
            .sort((a, b) => (likes[b.id_story] || 0) - (likes[a.id_story] || 0))
            .slice(0, limit);
    };

    const getStoriesByCategory = (categoryId) => {
        return stories.filter(story =>
            story.categories.some(category => category.id_category === categoryId)
        );
    };

    return (
        <StoryContext.Provider value={{
            stories,
            userStories,
            categories,
            isLoading,
            fetchStories,
            fetchCategories,
            fetchUserStories,
            getFeaturedStories,
            getStoriesByCategory,
            addStory,
            getStory,
            editStory,
            changeStoryStatus,
            removeStory
        }}>
            {children}
        </StoryContext.Provider>
    );
};

export const useStory = () => useContext(StoryContext);
