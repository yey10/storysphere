import React from 'react'
import { Link } from 'react-router-dom'
import DynamicNavbar from '../components/DynamicNavbar.jsx';
import Footer from '../components/Footer.jsx';
import ParticlesBackground from '../components/ParticlesBackground';
import SliderStories from '../components/Sliders/SliderStories.jsx';
import { featuredHistories, recommendedHistories, recentHistories } from '../data/histories';
import '../assets/css/histories.css';
import PortadaHistories from '../assets/img/portada_histories.webp'
import CategoriesData from '../components/CategoriesData.jsx';
import { categories } from '../data/categories.js'

const Histories = () => {
  return (
    <div>
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
          <DynamicNavbar />
          <main className="container container-histories mx-auto px-4 py-8">
            <div className='histories bg'>
              <h4 className='title'>Historias Destacadas</h4>
              <SliderStories title="Featured Histories" movies={featuredHistories} />
              <h4 className='title'>Recomendadas</h4>
              <SliderStories title="Recommended for You" movies={recommendedHistories} />
              <h4 className='title'>Historias más Recientes</h4>
              <SliderStories title="Recently Added" movies={recentHistories} />
            </div>

            <div className="histories2">
              <div>
                <h1 className='title'>StorySphere, Tu imaginación es tu único limite</h1>
                <p>Tu historia importa. Escríbela, compártela y deja huella en cada lector.</p>
                <p>Cada historia tiene el poder de emocionar, inspirar y conectar con quienes la leen. En StorySphere, creemos que cada escritor tiene una voz única que merece ser escuchada. No importa si eres un autor experimentado o alguien que escribe por pasión, aquí encontrarás un espacio para compartir tus relatos, descubrir nuevas historias y formar parte de una comunidad creativa. Expresa tus ideas, transforma tus pensamientos en palabras y deja que tu historia impacte a otros. ¡Es hora de escribir y hacer que tu voz trascienda!</p>
                <div>
                  <button><Link to="/login">Escribir</Link></button>
                  <button><Link to="/login">leer</Link></button>
                </div>
              </div>
              <div>
                <div>
                  <div className='bg-img'></div>
                  <img src={PortadaHistories} alt="" />
                </div>
              </div>
            </div>

            <div className="histories3 bg">
              <h2 className='title'>CATEGORÍAS</h2>
              <p>Tu próxima gran aventura está a solo un clic. Lee ahora en StorySphere.</p>
              <CategoriesData categories={categories} />
            </div>

            <Footer />

          </main>
        </div>
      </div>
    </div>
  )
}

export default Histories
