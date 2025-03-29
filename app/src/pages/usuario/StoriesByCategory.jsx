import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStory } from '../../context/StoryContext';
import ParticlesBackground from '../../components/ParticlesBackground';
import DynamicNavbar from '../../components/DynamicNavbar';
import Footer from '../../components/Footer';
import '../../assets/css/categorystory.css';

const StoriesByCategory = () => {
  const { id } = useParams(); // Obtiene el ID de la categoría desde la URL
  const { getStoriesByCategory, isLoading, categories } = useStory(); // Usamos la función del contexto

  // Buscar la categoría por ID
  const category = categories.find(cat => cat.id_category === Number(id));

  // Obtener historias por categoría desde el contexto
  const filteredStories = getStoriesByCategory(Number(id));

  return (
    <div className="min-h-screen bg-black relative">
      <ParticlesBackground />
      <div className='relative z-10'>
        <DynamicNavbar />
        <main className="container mx-auto px-4">
          <div className="categoryStory-page">
            <h1 className="title">
              {category ? `Historias en: ${category.category_name}` : "Categoría no encontrada"}
            </h1>

            <div className="stories-container">
              {isLoading ? (
                <p className="text-center text-gray-500">Cargando historias...</p>
              ) : filteredStories.length > 0 ? (
                filteredStories.map(story => (
                  <div key={story.id_story} className="story-card">
                    <div className='story-img'>
                      <img src={story.photo} alt={story.title} />
                    </div>
                    <div className='story-info'>
                      <h2>{story.title}</h2>
                      <p>{story.author}</p>
                      <p>{story.content.substring(0, 200)}...</p>
                      <button className='buttonLight'>
                        <Link to={`/user/story/${story.id_story}`}>Leer Historia</Link>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No hay historias en esta categoría.</p>
              )}
            </div>

            <button className='buttonLight'>
              <Link to="/user/categories">Volver</Link>
            </button>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default StoriesByCategory;
