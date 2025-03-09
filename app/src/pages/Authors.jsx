import React from 'react'
import { Link } from 'react-router-dom'
import DynamicNavbar from '../components/DynamicNavbar.jsx'
import Footer from '../components/Footer.jsx'
import ParticlesBackground from '../components/ParticlesBackground.jsx'
import { Star } from 'lucide-react'
import '../assets/css/authors.css'
import AuthorImg from '../assets/img/autor2.jpg'
import AuthorImg2 from '../assets/img/autor3.jpg'
import AuthorImg3 from '../assets/img/persona.png'
import AuthorsData from '../components/AuthorsData.jsx'
import { authors } from '../data/authors.js'

const Authors = () => {
  return (
    <div>
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
          <DynamicNavbar />
          <main className='container mx-auto px-4 py-8'>
            <div className='authors bg'>
              <h1 className='title'>Autores destacados</h1>
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

              <div className='all-authors'>
                <h2 className='title'>TODOS LOS AUTORES</h2>
                <p>Cada gran escritor comenzó con una sola palabra. Empieza hoy.</p>
                <AuthorsData authors={authors} />
              </div>

            </div>

            <Footer />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Authors
