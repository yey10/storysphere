import React from 'react'
import { Link } from 'react-router-dom'
import ParticlesBackground from '../../components/ParticlesBackground'
import DynamicNavbar from '../../components/DynamicNavbar'
import Footer from '../../components/Footer'
import '../../assets/css/explore.css'
import { Search, Star } from 'lucide-react'
import ExploreData from '../../components/ExploreData'
import { stories } from '../../data/stories'
import AuthorImg from '../../assets/img/autor2.jpg'
import AuthorImg2 from '../../assets/img/autor3.jpg'
import AuthorImg3 from '../../assets/img/persona.png'
import Descatado3 from '../../assets/img/Stories/21.webp'
import Categoria1 from '../../assets/img/Stories/22.webp'
import Categoria2 from '../../assets/img/Stories/23.webp'
import Categoria3 from '../../assets/img/Stories/24.webp'
import Categoria4 from '../../assets/img/Stories/25.webp'
import Categoria5 from '../../assets/img/Stories/26.webp'
import Categoria6 from '../../assets/img/Stories/27.webp'
import Categoria7 from '../../assets/img/Stories/28.webp'
import Categoria8 from '../../assets/img/Stories/29.webp'
import Categoria9 from '../../assets/img/Stories/30.webp'
import Descatado4 from '../../assets/img/Stories/31.webp'
import Categoria10 from '../../assets/img/Stories/48.webp'

const Explore = () => {
  return (
    <div>
        <div className="min-h-screen bg-black relative">
            <ParticlesBackground />
            <div className="relative z-10">
                <DynamicNavbar />
                <main className="container mx-auto px-4">
                  <div className="explore-page">
                    <div className="explore1">
                      <h1 className='title'>Explora en StorySphere</h1>
                      <p>Explora mundos nuevos, descubre personajes inolvidables y crea algo único.</p>
                      <div className='search'>
                        <form>
                          <input type="text" placeholder='Buscar una historia' />
                          <button type='submit'><Search /></button>
                        </form>
                      </div>
                    </div>

                    <div className="explore2 bg">
                      <h2 className='title'>Historias Recientes</h2>
                      <ExploreData stories={stories} />
                      <button className='buttonLight'><Link to="/stories">Explora Historias</Link></button>
                    </div>

                    <div className="explore3 bg">
                      <h2 className='title'>Autores Destacados</h2>
                      <p>Explora los autores más destacados de StorySphere.</p>
                      <div className='authors-content'>
                        <div className='author-box'>
                          <div className='author-image'><img src={AuthorImg} alt="" /></div>
                          <div className='author-info'>
                            <div><p>RANK #1</p></div>
                            <h3>Nombre Autor</h3>
                            <div><Star /><Star /><Star /><Star /><Star /><p>4.8</p></div>
                            <p>Soy un apasionado de la escritura y la creación de mundos...</p>
                            <button className='buttonLight'><Link to="/login">Ver Perfil</Link></button>
                          </div>
                        </div>
                        <div className='author-box'>
                          <div className='author-image'><img src={AuthorImg2} alt="" /></div>
                          <div className='author-info'>
                            <div><p>RANK #2</p></div>
                            <h3>Nombre Autor</h3>
                            <div><Star /><Star /><Star /><Star /><Star /><p>4.7</p></div>
                            <p>Escribo porque las historias me permiten viajar más allá de...</p>
                            <button className='buttonLight'><Link to="/login">Ver Perfil</Link></button>
                          </div>
                        </div>
                        <div className='author-box'>
                          <div className='author-image'><img src={AuthorImg3} alt="" /></div>
                          <div className='author-info'>
                            <div><p>RANK #3</p></div>
                            <h3>Nombre Autor</h3>
                            <div><Star /><Star /><Star /><Star /><Star /><p>4.5</p></div>
                            <p>Las palabras son mi forma de dar vida a ideas y emociones...</p>
                            <button className='buttonLight'><Link to="/login">Ver Perfil</Link></button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="explore4">
                      <h2 className='title'>Categorías</h2>
                      <p>Explora tus categorías favoritas en StorySphere.</p>
                      <div className="categories">
                        <div className='categories-content'>
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

                        <div className='categories-content'>
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

                        <div className='categories-content'>
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

                        <div className='categories-content'>
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

                  </div>

                  <Footer />
                </main>
            </div>
        </div>
    </div>
  )
}

export default Explore
