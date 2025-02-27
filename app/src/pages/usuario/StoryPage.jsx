import React from "react";
import { Link, useParams } from "react-router-dom";
import { stories } from "../../data/stories"; // Importamos las historias
import ParticlesBackground from "../../components/ParticlesBackground";
import NavbarUsuario from '../../components/NavbarUsuario';
import Footer from "../../components/Footer";
import { Star, Heart, MessageSquareMore, Bookmark, Download, ChevronsLeft, ChevronsRight, List, Send, Ellipsis } from "lucide-react";
import "../../assets/css/storypage.css";
import StoryImg from '../../assets/img/Stories/51.webp';
import autorImg from '../../assets/img/autor.jpg';
import commentImg from '../../assets/img/comentario.jpg';

const StoryPage = () => {
  /** 
  const { id } = useParams(); // Obtenemos el ID desde la URL
  const story = stories.find((s) => s.id === parseInt(id)); // Buscamos la historia por ID

  if (!story) {
    return <h2>Historia no encontrada</h2>;
  }
  */
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
                  <div><img src={StoryImg} alt="" /></div>
                  <div>
                    <h1 className="title">Los Susurros de la Biblioteca Eterna</h1>
                    <div className="info-content">
                      <div className="info-autor">
                        <div><img src={autorImg} alt="" /></div>
                        <p>By Autor</p>
                        <div><Star /><Star /><Star /><Star /><Star /></div>
                        <p>0.0 puntuación</p>
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
                          <p>En lo más profundo de la Biblioteca Eterna, donde el tiempo no transcurre y el conocimiento es infinito, un joven erudito descubre un libro prohibido que emana un extraño resplandor. Al abrirlo, despierta fuerzas ancestrales que habían permanecido selladas durante milenios. Ahora, atrapado entre la realidad y el reino de las sombras, debe descifrar los secretos ocultos en sus páginas antes de que la biblioteca lo reclame como uno de sus guardianes eternos.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="read-content">
                  <h2 className="title">Capitulo: "Nombre del capitulo"</h2>
                  <div className="canvas">
                    <p>En lo más profundo de la ciudad de Aldemar, oculta entre callejones olvidados, se erige la Biblioteca Eterna, un colosal edificio de piedra negra y vitrales resplandecientes. Se dice que dentro de sus muros se almacenan todos los libros jamás escritos, incluso aquellos que aún no han sido concebidos por la mente humana. Sin embargo, muy pocos se atreven a cruzar sus puertas, pues una antigua leyenda advierte que quienes escuchen los susurros entre sus estanterías corren el riesgo de perderse para siempre.</p>
                    <p>Nathaniel Crowe, un joven erudito obsesionado con los misterios del conocimiento prohibido, llegó a la biblioteca una noche de luna nueva, decidido a descubrir sus secretos. Los bibliotecarios, figuras encapuchadas que nunca hablaban, le indicaron el camino con un gesto silencioso. Avanzó entre interminables pasillos repletos de manuscritos polvorientos y pergaminos de origen incierto. A medida que se adentraba más en el laberinto de estanterías, comenzó a escuchar los susurros.</p>
                    <p>Eran voces suaves, hipnóticas, que pronunciaban su nombre y le susurraban revelaciones sobre el universo, sobre destinos aún no escritos y sobre el poder de la palabra. Fascinado, Nathaniel tomó un libro cuyas páginas parecían vibrar bajo su tacto. En su portada de cuero gastado, su propio nombre estaba grabado en letras doradas. Al abrirlo, leyó con asombro cada detalle de su vida, desde su infancia hasta el preciso instante en que giraba esas páginas. Luego, al avanzar en la lectura, se encontró con líneas que describían lo que aún no había vivido.</p>
                    <p>El terror se apoderó de él cuando se dio cuenta de que el libro no solo narraba su futuro, sino que le imponía un destino del cual no podría escapar. Desesperado, intentó cerrar el volumen, pero sus páginas pasaban solas, mostrándole un final inevitable: su propia desaparición dentro de la Biblioteca Eterna.</p>
                    <p>Intentó huir, pero los pasillos se distorsionaban a su alrededor. Los susurros se convirtieron en gritos y las sombras de los bibliotecarios se alargaban, rodeándolo. Nathaniel comprendió demasiado tarde que la biblioteca no era solo un almacén de conocimiento, sino un ente vivo que devoraba a aquellos que se atrevían a conocer demasiado. Y así, sin que nadie en el mundo exterior lo notara, Nathaniel Crowe se desvaneció en las páginas de su propio libro.</p>
                    <p>Al día siguiente, un nuevo volumen apareció en una estantería solitaria. Su título: Los Susurros de la Biblioteca Eterna. Y en la primera página, un nuevo nombre esperaba ser leído…</p>
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
