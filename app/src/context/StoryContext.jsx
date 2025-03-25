import { createContext, useContext, useEffect, useState, useCallback} from "react";
import { getAllStories, createStory, updateStory, deleteStory, getCategories, getStoryById, getUserStories } from '../api/storyService.jsx';
import { useLikes } from './LikeContext.jsx';

//Crear el contexto
const StoryContext = createContext();

export const StoryProvider = ({children}) =>{

    const [stories, setStories] = useState([]);
    const [userStories, setUserStories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetched, setHasFetched] = useState(false);
    const { likes } = useLikes();


 

     // Memorizar fetchStories
     const fetchStories = useCallback(async (forceReload = false) => {
        if (stories.length > 0 && !forceReload) return;
        setIsLoading(true);
        try {
            const data = await getAllStories();
            setStories(data);
        } catch (error) {
            console.error("Error al obtener historias:", error);
        } finally {
            setIsLoading(false);
        }
    }, [stories.length]);

    // Memorizar fetchCategories
    const fetchCategories = useCallback(async () => {
        if (categories.length > 0) return;
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
        }
    }, [categories.length]);

    useEffect(() => {
        if (!hasFetched) {
            fetchStories();
            fetchCategories();
            setHasFetched(true);
        }
    }, [fetchStories, fetchCategories, hasFetched]);

    const fetchUserStories = useCallback(async (userId) => {
        if (!userId) {
            console.error("Error: userId es undefined o null");
            return;
        }
    
        console.log(`Fetching user stories for userId: ${userId}`);
    
        setIsLoading(true);
        try {
            const data = await getUserStories(userId);
            console.log("📌 Datos recibidos en fetchUserStories:", data); // <-- Agregar log
            setUserStories(Array.isArray(data.stories) ? data.stories : []);
        } catch (error) {
            console.error("Error al obtener las historias del usuario:", error);
            setUserStories([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() =>{
        if (stories.length === 0) fetchStories();
        if (categories.length === 0) fetchCategories();
    }, [fetchStories, fetchCategories]);

    const addStory = async (storyData) =>{
        try {
            const newStory = await createStory(storyData);
            setStories([...stories, newStory]);
        } catch (error) {
            setStories(prevStories);
            console.error("Error al crear la historia:", error);
        }
    };

    const getStory = async (id) => {
        try {
            const story = await getStoryById(id);
            return story;
        } catch (error) {
            console.error("Error al obtener la historia por ID:", error);
            throw error;
        }
    };

    const editStory = async (id, updatedData) =>{
        try {
            const updatedStory = await updateStory(id, updatedData);
            console.log("Historia actualizada en editStory:", updatedStory); 
            setStories((prevStories) =>
                prevStories.map((story) =>
                    story.id_story === id ? updatedStory : story
                )
            );
            return updatedStory;
        } catch (error) {
            console.error("Error al editar la historia:", error);
            setStories(prevStories);
            throw error;
        }
    };

    const removeStory = async (id) =>{
        try {
            await deleteStory(id);
            setStories(stories.filter(story => story.id_story !== id));
        } catch (error) {
            setStories(prevStories);
            console.error("Error al eliminar la historia:", error);
        }
    };

    const getFeaturedStories = (limit = 5) => {
        return [...stories]
            .sort((a,b) => (likes[b.id_story] || 0) - (likes[a.id_story] || 0))
            .slice(0, limit);
    }


    return(
        <StoryContext.Provider value={{
            stories,
            userStories,
            categories,
            isLoading,
            fetchStories,
            fetchCategories,
            fetchUserStories,
            getFeaturedStories,
            addStory,
            getStory,
            editStory,
            removeStory
        }}>
            {children}
        </StoryContext.Provider>
    )
};

//Hook personalizado para consumir el contexto
export const useStory = () => useContext(StoryContext);