import React from 'react'
import { useParams } from 'react-router-dom';
import { useStory } from '../../context/StoryContext';
import ParticlesBackground from '../../components/ParticlesBackground'
import DynamicNavbar from '../../components/DynamicNavbar'
import Footer from '../../components/Footer'
import '../../assets/css/categorystory.css'

const StoriesByCategory = () => {
  const { id } = useParams(); // Obtiene el ID de la categoría desde la URL
  const { stories, isLoading, categories } = useStory(); // Obtiene las historias desde el contexto

  // Buscar el nombre de la categoría basado en su ID
  const category = categories.find(cat => cat.id_category.toString() === id);

  // Filtrar historias que pertenezcan a la categoría seleccionada
  const filteredStories = stories.filter(story => 
      story.categories && story.categories.some(cat => cat.id_category.toString() === id)
  );

  return (
      <div className="relative w-full min-h-screen bg-gray-100">
          <ParticlesBackground />
          <DynamicNavbar />

          <div className="max-w-5xl mx-auto px-4 py-10">
              <h1 className="text-4xl font-bold text-center mb-8">
                  {category ? `Historias en: ${category.name}` : "Categoría no encontrada"}
              </h1>

              {isLoading ? (
                  <p className="text-center text-gray-500">Cargando historias...</p>
              ) : filteredStories.length > 0 ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredStories.map(story => (
                          <li key={story.id_story} className="p-4 bg-white shadow-md rounded-lg">
                              <h2 className="text-xl font-semibold">{story.title}</h2>
                              <p className="text-gray-600">{story.content.substring(0, 150)}...</p>
                          </li>
                      ))}
                  </ul>
              ) : (
                  <p className="text-center text-gray-500">No hay historias en esta categoría.</p>
              )}
          </div>

          <Footer />
      </div>
  );
};

export default StoriesByCategory
