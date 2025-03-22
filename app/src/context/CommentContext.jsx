import { createContext, useContext, useState, useCallback } from "react";
import { updateComment, deleteComment, getCommentOwner, createComment, getAllCommentsByStory } from "../api/commentService";

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

    const addComment = useCallback(async (storyId, commentData) => {
        // Crear comentario local con contenido real y marcado como temporal
        const tempComment = {
            id_comment: Date.now(),
            content_comment: commentData.content_comment, // Asegurar que tenga el contenido correcto
            pending: true, // Para indicar que aún no ha sido confirmado por la API
        };
    
        // Agregar el comentario localmente de inmediato
        setComments((prevComments) => [...prevComments, tempComment]);
    
        try {
            // Enviar comentario a la API
            const newComment = await createComment(storyId, commentData);
    
            // Actualizar el estado reemplazando el comentario temporal por el real
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id_comment === tempComment.id_comment
                        ? { ...newComment, pending: false } // Marcarlo como finalizado
                        : comment
                )
            );
        } catch (error) {
            console.error("Error al agregar comentario:", error);
    
            // Si la API falla, eliminar el comentario temporal
            setComments((prevComments) =>
                prevComments.filter((comment) => comment.id_comment !== tempComment.id_comment)
            );
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


