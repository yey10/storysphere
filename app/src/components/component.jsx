import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground";
import NavbarUsuario from '../../components/NavbarUsuario';
import Footer from "../../components/Footer";
import ReactStars from "react-rating-stars-component";
import { Star, Heart, MessageSquareMore, Bookmark, Download, ChevronsLeft, ChevronsRight, List, Send, Ellipsis } from "lucide-react";
import "../../assets/css/storypage.css";
import StoryImg from '../../assets/img/Stories/51.webp';
import autorImg from '../../assets/img/autor.jpg';
import commentImg from '../../assets/img/comentario.jpg';
import { useStory } from "../../context/StoryContext";
import { useLikes } from "../../context/LikeContext";
import { useRatings } from "../../context/RatingsContext";
import { useComment } from "../../context/CommentContext";

const StoryPage = () => {
  
  const { id } = useParams();
  const {getStory} = useStory();
  const { likes, handleToggleLike, fetchLikes } = useLikes();
  const { ratings, userRatings, handleRateStory, fetchRating, handleRemoveRating } = useRatings();
  const { comments, fetchComment, addComment, removeComment } = useComment();
  const [newComment, setNewComment] = useState("");
  const [storyComments, setStoryComments] = useState([]); 
  const [isLiking, setIsLiking] = useState(false);
  const [story, setStory] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  //obtener historias
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const story = await getStory(id);
        setStory(story);
      } catch (error) {
        console.error("Error al obtener la historia:", error);
        setError(error);
      } finally {
        setIsloading(false);
      }
    };
    fetchStory();
   }, [id, getStory]);

   //Cargar los likes cuando el componente se monte
  useEffect(() => {
    fetchLikes(id);
  }, [id, fetchLikes]);

  //cargar los comentarios
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await fetchComment(id);
        setStoryComments(fetchedComments || []); // Asegurar que sea un array
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };
    fetchComments();
  }, [id, fetchComment]);

  //handlers

  const handleLike = () => {
    handleToggleLike(id);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    try {
      const newCommentData = await addComment(id, { content_comment: newComment });
      setStoryComments([...storyComments, newCommentData]); // Agregar nuevo comentario
      setNewComment(""); // Limpiar input
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
    }
  };
  
  const handleRemoveComment = async (commentId) => {
    try {
      await removeComment(commentId, id);
      setStoryComments(storyComments.filter(comment => comment.id_comment !== commentId)); // Actualizar estado
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };


    // Si está cargando, muestra un mensaje
    if (isLoading) {
      return (
        <div className="min-h-screen bg-black relative">
          <ParticlesBackground />
          <div className="relative z-10">
            <NavbarUsuario />
            <main className="container mx-auto px-4">
              <h2 className="text-white text-center py-10">Cargando historia...</h2>
              <Footer />
            </main>
          </div>
        </div>
      );
    }
  
    // Si hay un error, muestra un mensaje
    if (error) {
      return (
        <div className="min-h-screen bg-black relative">
          <ParticlesBackground />
          <div className="relative z-10">
            <NavbarUsuario />
            <main className="container mx-auto px-4">
              <h2 className="text-white text-center py-10">Error al cargar la historia</h2>
              <Footer />
            </main>
          </div>
        </div>
      );
    }
  
    // Si la historia no se encuentra
    if (!story) {
      return (
        <div className="min-h-screen bg-black relative">
          <ParticlesBackground />
          <div className="relative z-10">
            <NavbarUsuario />
            <main className="container mx-auto px-4">
              <h2 className="text-white text-center py-10">Historia no encontrada</h2>
              <Footer />
            </main>
          </div>
        </div>
      );
    }


  return (
    <div>
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
          <NavbarUsuario />
          <main className="container mx-auto px-4">
            <div className="storypage">
              <div className="read">
                <div className="read-info">
                  <div>  <img src={story.photo || StoryImg} alt={story.title} /></div>
                  <div>
                    <h1 className="title">{story.title}</h1>
                    <div className="info-content">
                      <div className="info-autor">
                        <div><img src={autorImg} alt="" /></div>
                        <p>By {story.author}</p>
                        <div>
                          <ReactStars
                                count={5} // 5 estrellas
                                value={userRatings[id] || ratings[id] || 0} // Mostrar calificación actual
                                onChange={(newRating) => handleRateStory(id, newRating)} // Al hacer click
                                size={24} // Tamaño de las estrellas
                                activeColor="#ffd700" // Color de las estrellas activas
                                isHalf={true} // Permitir medias estrellas
                          />
                        </div>
                        <p>{ratings[id] !== undefined ? ratings[id].toFixed(1) : "0.0"} puntuación</p>
                        <button><Link to="authors">Ver más</Link></button>
                      </div>
                      <div className="info-story">
                        <div>
                          <div className="buttom buttonLike">
                            {/* Botón de Like */}
                            <button 
                                onClick={handleLike} 
                                disabled={isLiking}
                                className=" flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                            >
                                <Heart fill={likes[id] ? "red" : "none"} />
                                <p>{likes[id] || 0}</p>
                            </button>
                          </div>
                          <div className="buttom buttonComms">
                            <button>
                              <MessageSquareMore />
                              <p>0</p>
                            </button>
                          </div>
                          <div className="buttom buttonFav">
                            <button>
                              <Bookmark />
                              <p>0</p>
                            </button>
                          </div>
                          <div className="buttom buttonDown">
                            <button>
                              <Download />
                              <p>0</p>
                            </button>
                          </div>
                        </div>
                        <div>
                        <p>{story.sinopsis}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="read-content">
                  <h2 className="title">Capitulo: "Nombre del capitulo"</h2>
                  <div className="canvas">
                  <p>{story.content}</p>
                  </div>
                </div>
              </div>

              <div className="chapters">
                <div><ChevronsLeft /></div>
                <div><List /><p>Capítulos</p></div>
                <div><ChevronsRight /></div>
              </div>
              <div className="punctuation">
                <h3 className="title">¿Te gusto lo que acabas de leer? Puedes puntuar la historia</h3>
                <div>
                    <ReactStars
                          count={5} // 5 estrellas
                          value={userRatings[id] || ratings[id] || 0} // Mostrar calificación actual
                          onChange={(newRating) => handleRateStory(id, newRating)} // Al hacer click
                          size={24} // Tamaño de las estrellas
                          activeColor="#ffd700" // Color de las estrellas activas
                          isHalf={true} // Permitir medias estrellas
                    />
                </div>
                <p>{ratings[id] !== undefined ? ratings[id].toFixed(1) : "0.0"} puntuación</p>
              </div>
              <div className="comments">
                <form action="">
                  <input
                   type="text"
                   value={newComment}
                   onChange={(e) => setNewComment(e.target.value)}
                   placeholder="Agrega un comentario" 
                  />
                  <button onClick={handleAddComment}><Send /></button>
                </form>
                <div className="box-comment">
                  <div>
                    <div><img src={commentImg} alt="" /></div>
                    <div>
                    <ul>
                      {storyComments.length > 0 ? (
                        storyComments.map((comment) => (
                          <li key={comment.id_comment}>
                            {comment.content_comment}
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
            </div>

            <Footer />
          </main>
        </div>
      </div>


      
    </div>
  );
};

export default StoryPage;

