import { createContext, useContext, useEffect, useState, useCallback} from "react";
import { getAllStories, createStory, updateStory, updateStoryStatus, deleteStory, getCategories, getStoryById, getUserStories } from '../api/storyService.jsx';
import { useLikes } from './LikeContext.jsx';

//Crear el contexto
const StoryContext = createContext();

export const StoryProvider = ({children}) =>{

    const [stories, setStories] = useState([]);
    const [userStories, setUserStories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { likes } = useLikes();


 

     // Memorizar fetchStories
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
    }, []);

    // Memorizar fetchCategories
    const fetchCategories = useCallback(async () => {
        if (categories.length > 0) return;
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
        }
    }, []);

    const fetchUserStories = useCallback(async (userId) => {
         
        if (!userId) {
            console.error("Error: userId es undefined o null");
            return;
        }
    
        setIsLoading(true);
        try {
            const data = await getUserStories(userId);
            setUserStories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al obtener las historias del usuario:", error);
            setUserStories([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const [storiesData, categoriesData] = await Promise.all([
                    getAllStories(),
                    getCategories()
                ]);
                setStories(storiesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error al obtener historias o categorías:", error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);


    const addStory = async (storyData) => {
        try {
            const newStory = await createStory(storyData);
            setStories((prev) => [...prev, newStory]);
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

            if (!updatedStory || !updatedStory.id_story) {
                throw new Error("Respuesta inválida del backend");
            }
    
            setStories((prev) =>
                prev.map((story) => 
                    story.id_story === id ? { ...story, ...updatedStory } : story
                )
            );
    
            setUserStories((prev) =>
                prev.map((story) => 
                    story.id_story === id ? { ...story, ...updatedStory } : story
                )
            );
    
            return updatedStory;
        } catch (error) {
            console.error("Error al editar la historia:", error);
            throw error;
        }
    };

    const changeStoryStatus = async (id, data) =>{
        try {
            const response = await updateStoryStatus(id, data);
            const updatedStory = response.story;

            if (!updatedStory) throw new Error("No se pudo actualizar el estado");

            setStories((prevStories) =>
                prevStories.map((story) =>
                    story.id_story === id ? { ...story, state: updatedStory.state } : story
                )
            );  

            return updatedStory;

        } catch (error) {
            throw error;
        }
    } 

    const removeStory = async (id) =>{
        try {
            await deleteStory(id);
            setStories((prevStories) => prevStories.filter(story => story.id_story !== id));
            setUserStories((prevUserStories) => prevUserStories.filter(story => story.id_story !== id));
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

    const getStoriesByCategory = (categoryId) => {
        return stories.filter(story =>
            story.categories.some(category => category.id_category === categoryId)
        );
    };


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
            getStoriesByCategory,
            addStory,
            getStory,
            editStory,
            changeStoryStatus,
            removeStory
        }}>
            {children}
        </StoryContext.Provider>
    )
};

//Hook personalizado para consumir el contexto
export const useStory = () => useContext(StoryContext);