import React, {useEffect, useState} from 'react';
import {useAuth} from '../../context/AuthContext.jsx';
import {useStory} from '../../context/StoryContext.jsx';
import { Link } from 'react-router-dom';
import ParticlesBackground from '../../components/ParticlesBackground';
import NavbarUsuario from  '../../components/NavbarUsuario';
import SliderUsuario from '../../components/Sliders/SliderUsuario';
import SliderUsuario2 from '../../components/Sliders/SliderUsuario2';
import SliderUsuario3 from '../../components/Sliders/SliderUsuario3';
import Footer from '../../components/Footer';
import Descatado1 from '../../assets/img/Stories/41.webp';
import Descatado2 from '../../assets/img/Stories/51.webp';
import Descatado3 from '../../assets/img/Stories/21.webp';
import Descatado4 from '../../assets/img/Stories/31.webp';
import premium from '../../assets/img/Stories/1.webp';
import premium2 from '../../assets/img/Stories/2.webp';
import Categoria1 from '../../assets/img/Stories/22.webp';
import Categoria2 from '../../assets/img/Stories/23.webp';
import Categoria3 from '../../assets/img/Stories/24.webp';
import Categoria4 from '../../assets/img/Stories/25.webp';
import Categoria5 from '../../assets/img/Stories/26.webp';
import Categoria6 from '../../assets/img/Stories/27.webp';
import Categoria7 from '../../assets/img/Stories/28.webp';
import Categoria8 from '../../assets/img/Stories/29.webp';
import Categoria9 from '../../assets/img/Stories/30.webp';
import Categoria10 from '../../assets/img/Stories/48.webp';
import '../../assets/css/homeusuario.css';
import { Crown } from 'lucide-react';

const Home = () => {

    const {getFeaturedStories} = useStory();
    const [highlightedStories, setHighlightedStories] = useState([]);

    useEffect(() => {
      const fetchStories = async () => {

        const featured = await getFeaturedStories(4);
        setHighlightedStories(featured);
      };
    
      fetchStories();

    }, []);

    const {isAuthenticated, isLoading} = useAuth();
    console.log('Estado de autenticación:', isAuthenticated)

    if (isLoading) {
      return <div>Cargando...</div>
    }



  return (
    <div>
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
            <NavbarUsuario />
            <main className="container mx-auto px-4">
                <div className="homeusuario">
                  <div className='body-1'>
                    <SliderUsuario />
                  </div>

                  <div className="body-2 bg">
                    <div className='boxslider'>
                      <h3 className='title'>Historias que te pueden interesar</h3>
                      <SliderUsuario2 />
                    </div>
                    <div className='boxslider'>
                      <h3 className='title'>Ultimas historias para ti</h3>
                      <SliderUsuario3 />
                    </div>
                  </div>

                  <div className="body-3">
                    <h3 className="title">¡Lo más destacado de StorySphere!</h3>
                    <div className="boximage">
                        {highlightedStories.map((story) => (
                            <div key={story.id_story}>
                                <img src={story.photo} alt={story.title} />
                                <div className="boximg-content">
                                    <h3 className="title">{story.title}</h3>
                                    <p>{story.author}</p>
                                    <p>{story.content.substring(0, 100)}...</p>
                                    <button className="buttonLight">
                                        <Link to={`/user/story/${story.id_story}`}>Leer más</Link>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p>Las mejores historias comienzan con una idea. ¿Listo para escribir la tuya?</p>
                  </div>

                  <div className="body-4 bg">
                    <h3 className='title'>HISTORIAS PREMIUM</h3>
                    <p>Haz crecer tu impacto con un plan premium. Accede a más herramientas y visibilidad</p>
                    <div className='body4-content'>
                      <div className='premium'>
                        <div><Crown /><p>PREMIUM</p></div>
                        <div><img src={premium} alt="" /></div>
                        <div>
                          <div><Crown /><p>PREMIUM</p></div>
                          <h4 className='title'>Ecos del pasado</h4>
                          <p>Lucía encuentra un antiguo diario que revela un amor prohibido y un misterio sin resolver en su familia. A medida que lee, extraños sucesos comienzan a rodearla. Ahora, deberá descubrir la verdad antes de que el pasado la alcance.</p>
                        </div>
                      </div>
                      <div className='premium'>
                        <div><Crown /><p>PREMIUM</p></div>
                        <div><img src={premium2} alt="" /></div>
                        <div>
                          <div><Crown /><p>PREMIUM</p></div>
                          <h4 className='title'>El Último Tren</h4>
                          <p>Daniel toma el tren nocturno como cada día, pero esta vez algo es diferente: los pasajeros parecen inmóviles, el paisaje nunca cambia y el reloj no avanza. Pronto descubre que está atrapado en un viaje sin final, donde cada estación es un eco de su pasado.</p>
                        </div>
                      </div>
                    </div>
                    <button className='buttonLight'><Link to="/services">OBTEN PREMIUM AHORA</Link></button>
                  </div>

                  <div className="body-5">
                    <div className='boxbody5'>
                      <div>
                        <h3 className='title'>ROMANCE</h3>
                        <p>Lo mejor en Romance aquí</p>
                        <p>Descubre nuevas categorías y recibe recomendaciones personalizadas</p>
                        <button className='buttonLight'><Link to="/categories">Ingresa a categorías</Link></button>
                      </div>
                      <div>
                        <div className='background-image'></div>
                        <div className='image-content'>
                          <div><img src={Descatado3} alt="" /></div>
                          <div><img src={Categoria1} alt="" /></div>
                          <div><img src={Categoria2} alt="" /></div>
                        </div>
                      </div>
                    </div>

                    <div className='boxbody5'>
                      <div>
                        <h3 className='title'>TERROR</h3>
                        <p>Lo mejor en Terror aquí</p>
                        <p>Descubre nuevas categorías y recibe recomendaciones personalizadas</p>
                        <button className='buttonLight'><Link to="/categories">Ingresa a categorías</Link></button>
                      </div>
                      <div>
                        <div className='background-image'></div>
                        <div className='image-content'>
                          <div><img src={Categoria3} alt="" /></div>
                          <div><img src={Categoria4} alt="" /></div>
                          <div><img src={Categoria5} alt="" /></div>
                        </div>
                      </div>
                    </div>

                    <div className='boxbody5'>
                      <div>
                        <h3 className='title'>ACCIÓN</h3>
                        <p>Lo mejor en Acción aquí</p>
                        <p>Descubre nuevas categorías y recibe recomendaciones personalizadas</p>
                        <button className='buttonLight'><Link to="/categories">Ingresa a categorías</Link></button>
                      </div>
                      <div>
                        <div className='background-image'></div>
                        <div className='image-content'>
                          <div><img src={Categoria6} alt="" /></div>
                          <div><img src={Categoria7} alt="" /></div>
                          <div><img src={Categoria8} alt="" /></div>
                        </div>
                      </div>
                    </div>

                    <div className='boxbody5'>
                      <div>
                        <h3 className='title'>FICCIÓN</h3>
                        <p>Lo mejor en Ficción aquí</p>
                        <p>Descubre nuevas categorías y recibe recomendaciones personalizadas</p>
                        <button className='buttonLight'><Link to="/categories">Ingresa a categorías</Link></button>
                      </div>
                      <div>
                        <div className='background-image'></div>
                        <div className='image-content'>
                          <div><img src={Categoria9} alt="" /></div>
                          <div><img src={Descatado4} alt="" /></div>
                          <div><img src={Categoria10} alt="" /></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Footer />

            </main>
        </div>
      </div>
    </div>
  )
}

export default Home
