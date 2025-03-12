import React from "react";
import { Send, Ellipsis, Heart } from "lucide-react";
import commentImg from "../../assets/img/comentario.jpg";
import "../../assets/css/storypage.css";

const StoryComments = () => {
  return (
    <div className="comments">
      <form action="">
        <input type="text" placeholder="Agrega un comentario" />
        <button type="submit"><Send /></button>
      </form>
      <div className="box-comment">
        <div>
          <div><img src={commentImg} alt="" /></div>
          <div>
            <div>
              <h4>Usuario</h4>
              <p>16/01/2025</p>
            </div>
            <p>Contenido del comentario</p>
            <p>Responder</p>
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
