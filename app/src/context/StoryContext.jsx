import { createContext, useContext, useEffect, useState} from "react";
import { getAllStories, createStory, updateStory, deleteStory } from '../api/storyService.jsx';

//Crear el contexto
const StoryContext = createContext();

export const StoryProvider = ({children}) =>{

    const [stories, setStories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        fetchStories();
    }, []);

    const fetchStories = async () =>{
        try {
            const data = await getAllStories();
            setStories(data);
        } catch (error) {
            console.error("Error al obtener las historias:", error);
        }finally{
            setIsLoading(false);
        }
    };

    const addStory = async (storyData) =>{
        try {
            const newStory = await createStory(storyData);
            setStories([...stories, newStory]);
        } catch (error) {
            console.error("Error al crear la historia:", error);
        }
    };

    const editStory = async (IdleDeadline, updatedData) =>{
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
            isLoading,
            fetchStories,
            addStory,
            editStory,
            removeStory
        }}>
            {children}
        </StoryContext.Provider>
    )
};

//Hook personalizado para consumir el contexto
export const useStory = () => useContext(StoryContext);