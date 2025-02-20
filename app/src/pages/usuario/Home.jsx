import React from 'react'
import { Link } from 'react-router-dom';
import ParticlesBackground from '../../components/ParticlesBackground';
import NavbarUsuario from '../../components/NavbarUsuario';
import SliderUsuario from '../../components/Sliders/SliderUsuario';
import SliderUsuario2 from '../../components/Sliders/SliderUsuario2';
import SliderUsuario3 from '../../components/Sliders/SliderUsuario3';
import Footer from '../../components/Footer';
import Descatado1 from '../../assets/img/Stories/41.webp'
import Descatado2 from '../../assets/img/Stories/51.webp'
import Descatado3 from '../../assets/img/Stories/21.webp'
import Descatado4 from '../../assets/img/Stories/31.webp'
import premium from '../../assets/img/Stories/1.webp'
import premium2 from '../../assets/img/Stories/2.webp'
import Categoria1 from '../../assets/img/Stories/22.webp'
import Categoria2 from '../../assets/img/Stories/23.webp'
import Categoria3 from '../../assets/img/Stories/24.webp'
import Categoria4 from '../../assets/img/Stories/25.webp'
import Categoria5 from '../../assets/img/Stories/26.webp'
import Categoria6 from '../../assets/img/Stories/27.webp'
import Categoria7 from '../../assets/img/Stories/28.webp'
import Categoria8 from '../../assets/img/Stories/29.webp'
import Categoria9 from '../../assets/img/Stories/30.webp'
import Categoria10 from '../../assets/img/Stories/48.webp'
import '../../assets/css/homeusuario.css';
import { Crown } from 'lucide-react'

const Home = () => {
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
                    <h3 className='title'>¡Lo más destacado de StorySphere!</h3>
                    <div className='boximage'>
                      <div>
                        <img src={Descatado1} alt="" />
                        <div className='boximg-content'>
                          <span className='title'>Un Asilo olvidado</span>
                          <p>Autor</p>
                          <p>En lo más profundo del bosque, un antiguo monasterio emana una luz inquietante cada noche. Se dice que quien cruce sus puertas jamás regresa, atrapado por los susurros de un secreto olvidado...</p>
                          <button className='buttonLight'><Link to="/histories">Leer más</Link></button>
                        </div>
                      </div>
                      <div>
                        <img src={Descatado2} alt="" />
                        <div className='boximg-content'>
                          <span className='title'>Los susurros de la biblioteca eterna</span>
                          <p>Autor</p>
                          <p>En lo más profundo de la biblioteca eterna, donde el tiempo no transcurre y el conocimiento es infinito, un jover erudito descubre un libro prohibido, que emana un extraño resplandor...</p>
                          <button className='buttonLight'><Link to="/histories">Leer más</Link></button> {/** historia por id */}
                        </div>
                      </div>
                      <div>
                        <img src={Descatado3} alt="" />
                        <div className='boximg-content'>
                          <span className='title'>Cartas bajo la lluvia</span>
                          <p>Autor</p>
                          <p>Sofía y Andrés solían dejarse cartas en un viejo buzón abandonado. Años después, una carta perdida llega a las manos de Sofía en medio de una tormenta. Cuando la abre, descubre una confesión de amor nunca entregada…</p>
                          <button className='buttonLight'><Link to="/histories">Leer más</Link></button>
                        </div>
                      </div>
                      <div>
                        <img src={Descatado4} alt="" />
                        <div className='boximg-content'>
                          <span className='title'>Hacia el Horizonte del Infinito</span>
                          <p>Autor</p>
                          <p>Desde la estación orbital, el comandante observa la última nave partir hacia lo desconocido. Más allá del portal estelar, un nuevo destino aguarda, donde el tiempo y el espacio dejan de tener sentido...</p>
                          <button className='buttonLight'><Link to="/histories">Leer más</Link></button>
                        </div>
                      </div>
                    </div>
                    <p>Las mejores historias comienzan con una idea. ¿Listo para escribir la tuya?</p>
                  </div>

                  <div className="body-4 bg">
                    <h3 className='title'>HISTORIAS PREMIUM</h3>
                    <p>Haz crecer tu impacto con un plan premium. Accede a más herramientas y visibilidad</p>
                    <div className='body4-content'>
                      <div className='premium'>
                        <div><img src={premium} alt="" /></div>
                        <div>
                          <div><Crown /><p>PREMIUM</p></div>
                          <span className='title'>Ecos del pasado</span>
                          <p>Lucía encuentra un antiguo diario que revela un amor prohibido y un misterio sin resolver en su familia. A medida que lee, extraños sucesos comienzan a rodearla. Ahora, deberá descubrir la verdad antes de que el pasado la alcance.</p>
                        </div>
                      </div>
                      <div className='premium'>
                        <div><img src={premium2} alt="" /></div>
                        <div>
                          <div><Crown /><p>PREMIUM</p></div>
                          <span className='title'>El Último Tren</span>
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
