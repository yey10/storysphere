import { createContext, useContext, useEffect, useState, useCallback} from "react";
import { getAllStories, createStory, updateStory, deleteStory, getCategories, getStoryById  } from '../api/storyService.jsx';

//Crear el contexto
const StoryContext = createContext();

export const StoryProvider = ({children}) =>{

    const [stories, setStories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);




     // Memorizar fetchStories
    const fetchStories = useCallback(async () => {
        console.log("Fetching stories...");
        try {
            const data = await getAllStories();
            setStories(data);
        } catch (error) {
            console.error("Error al obtener las historias:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Memorizar fetchCategories
    const fetchCategories = useCallback(async () => {
        console.log("Fetching categories...");
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
        }
    }, []);

    useEffect(() =>{
        if (stories.length === 0) fetchStories();
        if (categories.length === 0) fetchCategories();
    }, [fetchStories, fetchCategories, stories.length, categories.length]);

    const addStory = async (storyData) =>{
        try {
            const newStory = await createStory(storyData);
            setStories([...stories, newStory]);
        } catch (error) {
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
            setStories(stories.map(story => (story.id_story === id ? updatedStory : story)));
        } catch (error) {
            console.error("Error al editar la historia:", error);
        }
    };

    const removeStory = async (id) =>{
        try {
            await deleteStory(id);
            setStories(stories.filter(story => story.id_story !== id));
        } catch (error) {
            console.error("Error al eliminar la historia:", error);
        }
    };


    return(
        <StoryContext.Provider value={{
            stories,
            categories,
            isLoading,
            fetchStories,
            fetchCategories,
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