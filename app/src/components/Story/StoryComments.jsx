import React from "react";
import commentImg from '../../assets/img/comentario.jpg';
import { Send, Ellipsis, Heart } from "lucide-react";

const StoryComments = ({
  storyComments,
  newComment,
  setNewComment,
  handleAddComment,
  handleRemoveComment,
  currentUserId,
  isAdmin,
}) => {
  console.log("Comentarios en StoryComments:", storyComments);

  

  // Verificar si storyComments es un array
  if (!Array.isArray(storyComments)) {
    return <p>Error: No se pudieron cargar los comentarios.</p>;
  }

  return (
    <div className="comments">
      {/* Formulario para añadir comentarios */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Evitar recarga de la página
          handleAddComment(e); // Llamar a la función para añadir comentario
        }}
      >
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Agrega un comentario"
        />
        <button type="submit">
          <Send />
        </button>
      </form>

      {/* Lista de comentarios */}
      <div className="box-comment">
        <div>
          <div>
            <img src={commentImg} alt="" />
          </div>
          <div>
            <ul>
              {storyComments.length > 0 ? (
                storyComments.map((comment) => {
                  const isOwner = comment.id_user === currentUserId; // Verificar si el usuario es el dueño
                  const canEditOrDelete = isOwner || isAdmin; // Permitir editar/eliminar si es dueño o admin

                  return (
                    <li key={comment.id_comment}>
                      {comment.content_comment || "Comentario sin contenido"}

                      {/* Mostrar botones de editar y eliminar si tiene permisos */}
                      {canEditOrDelete && (
                        <div>
                          <button onClick={() => handleRemoveComment(comment.id_comment)}>
                            Eliminar
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })
              ) : (
                <p>No hay comentarios aún</p>
              )}
            </ul>
          </div>
        </div>
        <div>
          <Ellipsis />
          <Heart />
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default StoryComments;