import { createContext, useContext, useState, useCallback } from "react";
import { updateComment, deleteComment, getCommentOwner, createComment, getAllCommentsByStory } from "../api/commentService";

//crear el contexto
const CommentContext = createContext();

export const CommentProvider = ({children}) =>{
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const getAllComments = useCallback(async (storyId) => {
        setIsLoading(true);
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

    const addComment = useCallback(async (storyId, commentData) => {
        const tempId = Date.now(); // ID temporal único
    
        // Crear y agregar comentario temporal
        const tempComment = {
            id_comment: tempId,
            content_comment: commentData.content_comment,
            pending: true, // Marcar como "en espera"
            created_at: new Date().toISOString(), // Fecha local para mostrarlo de inmediato
        };
    
        setComments((prev) => [...prev, tempComment]);
    
        try {
            // Enviar el comentario al backend
            const newComment = await createComment(storyId, commentData);
    
            // Reemplazar el comentario temporal con el real
            setComments((prev) =>
                prev.map((comment) =>
                    comment.id_comment === tempId
                        ? { ...newComment, pending: false } // Reemplazo
                        : comment
                )
            );
        } catch (error) {
            console.error("Error al agregar comentario:", error);
    
            // Eliminar el comentario temporal si falla la API
            setComments((prev) => prev.filter((comment) => comment.id_comment !== tempId));
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


