import React from 'react';
import StoryEditor from '../../components/StoryEditor';
import { useStory } from '../../context/StoryContext';
import ParticlesBackground from '../../components/ParticlesBackground'
import DynamicNavbar from '../../components/DynamicNavbar'
import Footer from '../../components/Footer'

const CreateStoryPage = () => {
  const { addStory } = useStory();

  const handleSave = () => {
    console.log('Historia guardada con éxito');
    // Puedes redirigir al usuario o mostrar un mensaje de éxito
  };

  return (
    <div>
        <div className="min-h-screen bg-black relative">
            <ParticlesBackground />
            <div className="relative z-10">
                <DynamicNavbar />
                <main className="container mx-auto px-4">
                  <StoryEditor onSave={handleSave} />
                </main>
            </div>
        </div>
      
    </div>
  );
};

export default CreateStoryPage;