import React from 'react';
import DynamicNavbar from '../components/DynamicNavbar.jsx';
import StoryForm from './StoryForm.jsx';

const CreateStoryPage = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
      <DynamicNavbar />
      <h2 className="text-xl font-bold mb-4">Crear Nueva Historia</h2>
      <StoryForm/>
    </div>
  )
}

export default CreateStoryPage;
