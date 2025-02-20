import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ParticlesBackground from '../components/ParticlesBackground';
import '../assets/css/home.css';
import SliderHome from '../components/Sliders/SliderHome';
import SliderHome2 from '../components/Sliders/SliderHome2';
import ReactImg1 from '../assets/img/leyendo.jpeg';
import ReactImg2 from '../assets/img/escribiendo.jpeg';
import ReactImg3 from '../assets/img/interactuar.jpeg';
import ReactImg4 from '../assets/img/Accion.jpeg';
import ReactImg5 from '../assets/img/Drama.jpeg';
import ReactImg6 from '../assets/img/Ficcion.jpeg';
import ReactImg7 from '../assets/img/Misterio.jpeg';
import ReactImg8 from '../assets/img/Romance.jpeg';
import ReactImg9 from '../assets/img/Terror.jpeg';
import Footer from '../components/Footer';


const Home = () => {
  return (
    <>
      <div className="home-1">
        <div className='home1-content'>
          <h1 className='title'>¡Bienvenido a StorySphere!</h1>
          <p>Sumérgete en un universo de historias ilimitadas. Escribe, comparte y descubre mundos nuevos con nuestra vibrante comunidad de narradores. ¡Explora ahora y deja que tu imaginación vuele libremente!</p>
          <button><Link to="/login">¡Empieza ya!</Link></button>
        </div>
      </div>
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
          <Navbar />
          <main className="container mx-auto px-4">
            <div className='home'>
              <SliderHome />

              <div className="home-3 bg">
                <h3 className='title'>¿CÓMO FUNCIONA?</h3>
                <div className="home3-content">
                  <div>
                    <div className='image'><img src={ReactImg1} alt="Escribir" /></div>
                    <span>Puedes Leer</span>
                    <p>Ofrecemos una galería de historias creadas por otros usuarios que puedes leer y disfrutar tanto como quieras.</p>
                  </div>
                  <div>
                    <div className='image'><img src={ReactImg2} alt="Leer" /></div>
                    <span>Puedes Escribir</span>
                    <p>Ofrecemos una amplia gama de herramientas de escritura que puedes aprovechar sin importar tu nivel de escritura.</p>
                  </div>
                  <div>
                    <div className='image'><img src={ReactImg3} alt="Interactuar" /></div>
                    <span>Puedes Interactuar</span>
                    <p>También puedes contactar con otros usuarios de tus mismos gustos e incluso hablar con tus autores favoritos.</p>
                  </div>
                </div>
                <button><Link to="/login">¡ INICIA AHORA !</Link></button>
              </div>

              <div className="home-4">
                <h3 className='title'>La categoría que quieras a tu alcance</h3>
                {/* seccion de categorias */}
                <div className="categorias">
                  <div><img src={ReactImg4} alt="Acción" /><div><h4>Acción</h4><button><Link to="/categories">Saber más</Link></button></div></div>
                  <div><img src={ReactImg5} alt="Drama" /><div><h4>Drama</h4><button><Link to="/categories">Saber más</Link></button></div></div>
                  <div><img src={ReactImg6} alt="Ficción" /><div><h4>Ficción</h4><button><Link to="/categories">Saber más</Link></button></div></div>
                  <div><img src={ReactImg7} alt="Misterio" /><div><h4>Misterio</h4><button><Link to="/categories">Saber más</Link></button></div></div>
                  <div><img src={ReactImg8} alt="Romance" /><div><h4>Romance</h4><button><Link to="/categories">Saber más</Link></button></div></div>
                  <div><img src={ReactImg9} alt="Terror" /><div><h4>Terror</h4><button><Link to="/categories">Saber más</Link></button></div></div>
                </div>
              </div>

              <SliderHome2 />

            </div>

            <Footer />

          </main>
        </div>
      </div>
    </>
  )
}

export default Home
