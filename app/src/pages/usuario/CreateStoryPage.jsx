import React from 'react';
import StoryEditor from '../../components/StoryEditor';
import { useNavigate } from "react-router-dom";
import ParticlesBackground from '../../components/ParticlesBackground'
import DynamicNavbar from '../../components/DynamicNavbar'
import Footer from '../../components/Footer'

const CreateStoryPage = () => {

  const navigate = useNavigate(); 

  const handleSave = () => {
    console.log('Historia guardada con éxito');
    navigate("/user/userStories");
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