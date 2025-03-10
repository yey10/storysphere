import {createContext, useState, useContext, useEffect} from 'react';
import {toggleLike, getStoryLikes} from '../api/likeService';

const LikeContext = createContext();

export const LikeProvider = ({children}) => {

    const [likes, setLikes] = useState({});

    const handleToggleLike = async (storyId) => {
        try {
            const result = await toggleLike(storyId);
            setLikes((prevLikes) => ({
                ...prevLikes,
                [storyId]: prevLikes[storyId] ? prevLikes[storyId] - 1 : 1,
            }));
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const fetchLikes = async (storyId) => {
        try {
            const count = await getStoryLikes(storyId);
            setLikes((prevLikes) => ({
                ...prevLikes,
                [storyId]: count,
            }));
        } catch (error) {
            console.error("Error fetching likes:", error);
        }
    }

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