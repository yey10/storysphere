import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground";
import NavbarUsuario from '../../components/NavbarUsuario';
import Footer from "../../components/Footer";
import { Star, Heart, MessageSquareMore, Bookmark, Download, ChevronsLeft, ChevronsRight, List, Send, Ellipsis } from "lucide-react";
import "../../assets/css/storypage.css";
import StoryImg from '../../assets/img/Stories/51.webp';
import autorImg from '../../assets/img/autor.jpg';
import commentImg from '../../assets/img/comentario.jpg';
import { useStory } from "../../context/StoryContext";

const StoryPage = () => {
  
  const { id } = useParams();
  const {getStory} = useStory();
  const [story, setStory] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

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
                        <div><Star /><Star /><Star /><Star /><Star /></div>
                        <p>{story.rating || "0.0"} puntuación</p>
                        <button><Link to="authors">Ver más</Link></button>
                      </div>
                      <div className="info-story">
                        <div>
                          <div><Heart /><p>0</p></div>
                          <div><MessageSquareMore /><p>0</p></div>
                          <div><Bookmark /><p>0</p></div>
                          <div><Download /><p>0</p></div>
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
                <div><Star /><Star /><Star /><Star /><Star /></div>
                <p>0.0</p>
              </div>
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
            </div>

            <Footer />
          </main>
        </div>
      </div>


      {/** 
      <div className="story-page">
        <h1>{story.title}</h1>
        <p><strong>Autor:</strong> {story.author}</p>
        <img src={story.image} alt={story.title} />
        <p>{story.sinopsis}</p>
        <p>
          📖 Aquí puedes agregar el contenido completo de la historia para que el usuario lo lea.
        </p>
      </div>
      */}
    </div>
  );
};

export default StoryPage;
