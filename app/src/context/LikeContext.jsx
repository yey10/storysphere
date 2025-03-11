import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toggleLike, getStoryLikes } from '../api/likeService';
import { getAllStories } from '../api/storyService';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
    const [likes, setLikes] = useState({});
    const [userLikedStories, setUserLikedStories] = useState({}); 

    // Cargar los likes de una historia específica
    const fetchLikes = useCallback(async (storyId) => {
        if (!storyId) return;
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

    // Alternar like/unlike
    const handleToggleLike = useCallback(async (storyId) => {
        if (!storyId) return;

        try {
            const likedBefore = userLikedStories[storyId] || false;
            await toggleLike(storyId);

            setLikes((prevLikes) => ({
                ...prevLikes,
                [storyId]: likedBefore ? prevLikes[storyId] - 1 : prevLikes[storyId] + 1,
            }));

            setUserLikedStories((prevUserLikes) => ({
                ...prevUserLikes,
                [storyId]: !likedBefore,
            }));

        } catch (error) {
            console.error("Error toggling like:", error);
        }
    }, [userLikedStories]);

    // Cargar los likes de todas las historias cuando se monta el componente
    useEffect(() => {
        const fetchAllLikes = async () => {
            try {
                const stories = await getAllStories();
                if (!stories || stories.length === 0) return;

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
