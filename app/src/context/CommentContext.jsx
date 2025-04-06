import { createContext, useContext, useState, useCallback } from "react";
import { updateComment, deleteComment, getCommentOwner, createComment, getAllCommentsByStory, getAllCommentsAdmin } from "../api/commentService";

//crear el contexto
const CommentContext = createContext();

export const CommentProvider = ({children}) =>{
    const [comments, setComments] = useState([]);
    
    const [isLoading, setIsLoading] = useState(true);


    const getAllComments = useCallback(async (storyId) => {
        setIsLoading(true);
        try {
            const comments = await getAllCommentsByStory(storyId);
            setComments(Array.isArray(comments) ? comments : []);
        } catch (error) {
            console.error("Error al obtener los comentarios:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getAllCommentsAdmins = useCallback(async () => {
        setIsLoading(true);
        try {
            const comments = await getAllCommentsAdmin();
            setComments(Array.isArray(comments) ? comments : []);
        }
        catch (error) {
            console.error("Error al obtener los comentarios:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addComment = useCallback(async (storyId, commentData) => {
        const tempId = Date.now(); // ID temporal
        const tempComment = { id: tempId, content_comment: commentData.content_comment, isTemp: true }; // Bandera temporal
    
        setComments((prev) => [...prev, tempComment]); // Mostrar comentario temporal
    
        try {
            const newComment = await createComment(storyId, commentData); // API responde con el comentario creado
            setComments((prev) => 
                prev.map((c) => (c.id === tempId ? { ...newComment, isTemp: false } : c)) // Reemplazarlo
            );
        } catch (error) {
            console.error("Error al agregar comentario:", error);
            setComments((prev) => prev.filter((c) => c.id !== tempId)); // Eliminar el temporal si falla
        }
    }, []);
    
    

    const editComment = useCallback(async (id, updatedData) => {
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
    }, []);

    const removeComment = useCallback(async (id) => {
        try {
            await deleteComment(id);
            setComments((prevComments) => 
                prevComments.filter(comment => comment.id_comment !== id)
            );
        } catch (error) {
            console.error("Error al eliminar el comentario:", error);
        }
    }, []);

    const fetchCommentOwner = useCallback(async (id) => {
        try {
            return await getCommentOwner(id);
        } catch (error) {
            console.error("Error al obtener el dueño del comentario:", error);
            throw error;
        }
    }, []);


    return (
        <CommentContext.Provider value={{
            comments,
            isLoading,
            getAllComments,
            getAllCommentsAdmins,
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


