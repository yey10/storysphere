import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { stories } from '../../data/histories';
import ParticlesBackground from '../../components/ParticlesBackground'
import DynamicNavbar from '../../components/DynamicNavbar'
import Footer from '../../components/Footer'
import '../../assets/css/categorystory.css'

const StoriesByCategory = () => {
  const { id } = useParams();
  const filteredStories = stories.filter(story => story.category === id);

  return (
    <div>
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className='relative z-10'>
          <DynamicNavbar />
          <main className="container mx-auto px-4">
            <div className="categoryStory-page">
              <h1 className="title">Historias de {id}</h1>
              <div className="stories-container">
                {filteredStories.length > 0 ? (
                  filteredStories.map(story => (
                    <div key={story.id} className="story-card">
                      <div className='story-img'>
                        <img src={story.image} alt={story.title} />
                      </div>
                      <div className='story-info'>
                        <h2>{story.title}</h2>
                        <p>{story.author}</p>
                        <p>{story.sinopsis}</p>
                        <button className='buttonLight'>Leer Historia</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No hay historias en esta categoría</p>
                )}
              </div>
              <button className='buttonLight'><Link to="/user/categories">Volver</Link></button>
            </div>

            <Footer />
          </main>
        </div>
      </div>
    </div>
  )
}

export default StoriesByCategory
