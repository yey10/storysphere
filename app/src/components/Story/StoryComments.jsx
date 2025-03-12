import React from "react";
import commentImg from '../../assets/img/comentario.jpg';
import { Send, Ellipsis, Heart } from "lucide-react";

const StoryComments = ({ storyComments, newComment, setNewComment, handleAddComment, handleRemoveComment }) => {

  console.log("Comentarios en StoryComments:", storyComments); // Depuración
  if (!Array.isArray(storyComments)) {
    return <p>Error: No se pudieron cargar los comentarios.</p>;
  }

  return (
    <div className="comments">
      <form action="">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Agrega un comentario"
        />
        <button onClick={handleAddComment}>
          <Send />
        </button>
      </form>
      <div className="box-comment">
        <div>
          <div>
            <img src={commentImg} alt="" />
          </div>
          <div>
          <ul>
            {storyComments.length > 0 ? (
              storyComments.map((comment) => (
                <li key={comment.id_comment}>
                  {comment.content_comment || "Comentario sin contenido"}
                  <button onClick={() => handleRemoveComment(comment.id_comment)}>Eliminar</button>
                </li>
              ))
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