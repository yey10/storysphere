import React from "react";
import commentImg from '../../assets/img/comentario.jpg';
import { Send, Trash2, Heart } from "lucide-react";

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
      <div className="comments-content">
        {storyComments.length > 0 ? (
          storyComments.map((comment) => (
            <div key={comment.id_comment} className="box-comment">
              <div>
                <div>
                  <img src={commentImg} alt="" />
                </div>
                <div>
                  <div>
                    <h4>Karla Martínez</h4>
                    <p>16/03/2025</p>
                  </div>
                  <p>{comment.content_comment || "Comentario sin contenido"}</p>
                  <p>Responder</p>
                </div>
              </div>
              <div>
                <button onClick={() => handleRemoveComment(comment.id_comment)}><Trash2 /></button>
                <Heart />
                <p>0</p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay comentarios aún</p>
        )}
      </div>
    </div>
  );
};

export default StoryComments;