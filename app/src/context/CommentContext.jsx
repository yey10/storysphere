import { createContext, useContext, useState, useEffect, useCallback, Children } from "react";
import { getCommentById, updateComment, deleteComment, getCommentOwner, createComment, getAllCommentsByStory } from "../api/commentService";

//crear el contexto
const CommentContext = createContext();

export const CommentProvider = ({children}) =>{
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const getAllComments = useCallback(async (storyId) => {
        try {
            const comments = await getAllCommentsByStory(storyId);
            console.log("Comentarios obtenidos:", comments); // Depuración
            setComments(Array.isArray(comments) ? comments : []);
        } catch (error) {
            console.error("Error al obtener los comentarios:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);
/*
    const fetchComment = useCallback(async (id) => {
        try {
            const comment = await getCommentById(id);
            setComments((prevComments) => {
                const prevCommentsArray = Array.isArray(prevComments) ? prevComments : [];
                // Filtra el comentario antiguo
                const filteredComments = prevCommentsArray.filter(c => c.id_comment !== id);
                // Agrega el nuevo comentario
                return [...filteredComments, comment]; 
            });
        } catch (error) {
            console.error("Error al obtener el comentario:", error);
        }
    }, []);
*/
    const addComment = async (storyId, commentData) =>{
        try {
            const newComment = await createComment(storyId, commentData);
            setComments((prevComments) => [...prevComments, newComment]);
        } catch (error) {
            console.error("Error al agregar comentario:", error);
        }
    }

    const editComment = async (id, updatedData) => {
        try {
            const updatedComment = await updateComment(id, updatedData);
            setComments((prevComments) =>
                prevComments.map(comment => 
                  comment.id_comment === id ? updatedComment : comment
                )
            );
        } catch (error) {
            console.error("Error al actualizar el comentario:", error);
        }
    };

    const removeComment = async (id) => {
        try {
            await deleteComment(id);
            setComments((prevComments) => 
                prevComments.filter(comment => comment.id_comment !== id)
            );
        } catch (error) {
            console.error("Error al eliminar el comentario:", error);
        }
    };

    const fetchCommentOwner = async (id) => {
        try {
            return await getCommentOwner(id);
        } catch (error) {
            console.error("Error al obtener el dueño del comentario:", error);
            throw error;
        }
    };


    return (
        <CommentContext.Provider value={{
            comments,
            isLoading,
            getAllComments,
            editComment,
            addComment,
            removeComment,
            fetchCommentOwner
        }}>
            {children}
        </CommentContext.Provider>
    );
};

export const useComment = () => useContext(CommentContext);


