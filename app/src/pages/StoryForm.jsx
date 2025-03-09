import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useStory } from '../context/StoryContext.jsx';
import DynamicNavbar from '../components/DynamicNavbar.jsx';

const StoryForm = ({ onClose }) => {
    const { addStory } = useStory();
    const [title, setTitle] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState(null);
    const [state, setState] = useState("public");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('sinopsis', sinopsis);
        formData.append('content', content);
        if (photo) formData.append('photo', photo);
        formData.append('state', state);
        formData.append('categories', JSON.stringify([]));

        try {
            await addStory(formData);
            onClose();
        } catch (error) {
            console.error("Error al crear la historia:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
           
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Historia</h1>

                {/* Campo de Título */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Título de la historia"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Campo de Sinopsis */}
                <div>
                    <label htmlFor="sinopsis" className="block text-sm font-medium text-gray-700">Sinopsis</label>
                    <textarea
                        id="sinopsis"
                        placeholder="Escribe una breve sinopsis de la historia"
                        value={sinopsis}
                        onChange={(e) => setSinopsis(e.target.value)}
                        rows="4"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Editor de Contenido (ReactQuill) */}
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenido</label>
                    <div className="mt-1">
                        <ReactQuill
                            value={content}
                            onChange={setContent}
                            className="bg-white rounded-md shadow-sm"
                            style={{ height: '200px', marginBottom: '40px' }} // Ajusta la altura y el margen
                        />
                    </div>
                </div>

                {/* Campo de Imagen */}
                <div>
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Imagen de Portada</label>
                    <input
                        type="file"
                        id="photo"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Campo de Estado (Público/Privado) */}
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
                    <select
                        id="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="public">Pública</option>
                        <option value="private">Privada</option>
                    </select>
                </div>

                {/* Botón de Envío */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Crear Historia
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StoryForm;