import {createContext, useState, useContext, useEffect, useCallback} from 'react';
import {toggleLike, getStoryLikes} from '../api/likeService';
import { getAllStories } from '../api/storyService';

const LikeContext = createContext();

export const LikeProvider = ({children}) => {

    const [likes, setLikes] = useState({});

const fetchLikes = useCallback(async (storyId) => {
    try {
        const count = await getStoryLikes(storyId);
        setLikes((prevLikes) => ({
            ...prevLikes,
            [storyId]: count,
        }));
    } catch (error) {
        console.error("Error fetching likes:", error);
    }
}, []);


const handleToggleLike = useCallback(async (storyId) => {
    try {
        await toggleLike(storyId);
        setLikes((prevLikes) => ({
            ...prevLikes,
            [storyId]: prevLikes[storyId] ? prevLikes[storyId] - 1 : 1,
        }));
    } catch (error) {
        console.error("Error toggling like:", error);
    }
}, []);

// Cargar los likes al montar el componente (si hay historias)
useEffect(() => {
    const fetchAllLikes = async () => {
        try {
           
            const stories = await getAllStories();

            
            const likesData = {};

            
            await Promise.all(
                stories.map(async (story) => {
                    const count = await getStoryLikes(story.id_story);
                    likesData[story.id_story] = count;
                })
            );

            
            setLikes(likesData);
        } catch (error) {
            console.error("Error fetching all likes:", error);
        }
    };

    fetchAllLikes();
}, []); 
    

    return (
        <LikeContext.Provider value={{
            likes,
            handleToggleLike,
            fetchLikes
        }}>
            {children}
        </LikeContext.Provider>
    );

};

export const useLikes = () => useContext(LikeContext);