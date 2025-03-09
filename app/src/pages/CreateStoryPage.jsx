import React from 'react';
import StoryEditor from '../components/StoryEditor';
import { useStory } from '../context/StoryContext';
import NavbarUsuario from '../components/NavbarUsuario';

const CreateStoryPage = () => {
  const { addStory } = useStory();

  const handleSave = () => {
    console.log('Historia guardada con éxito');
    // Puedes redirigir al usuario o mostrar un mensaje de éxito
  };

  return (
    <div>
      <StoryEditor onSave={handleSave} />
      <NavbarUsuario/>
    </div>
  );
};

export default CreateStoryPage;