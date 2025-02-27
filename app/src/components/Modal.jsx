import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Plus } from "lucide-react";

const Modal = ({ story, isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen || !story) return null;

    const handleReadMore = () => {
        navigate(`/story/${story.id}`); // Redirige a la página de la historia
        onClose(); // Cierra el modal
    };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-image">
          <img src={story.image} alt={story.title} />
        </div>
        <div className="modal-info">
          <h2 className="title">{story.title}</h2>
          <p>By {story.author}</p>
          <div>
            <Star /><Star /><Star /><Star /><Star /><p>{story.opinions} opiniones</p> <div><Plus /></div>
          </div>
          <p>{story.sinopsis}</p>
          <div><p>{story.category}</p></div>
          <div>
            <button className="read-button" onClick={handleReadMore}>Leer</button>
            <button className="close-button" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
