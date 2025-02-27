import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useStory } from '../context/StoryContext.jsx';
import DynamicNavbar from '../components/DynamicNavbar.jsx';

const StoryForm = ({onClose}) => {
    const {addStory} = useStory();
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

    return(



        <form onSubmit={handleSubmit} className='p-4 space-y-4'>

            <DynamicNavbar/>

            <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required/>

            <textarea placeholder="Sinopsis" value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} className="w-full p-2 border rounded"/>

            <ReactQuill value={content} onChange={setContent} className="h-40" />

            <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} className="w-full p-2 border rounded"/>

            <select value={state} onChange={(e) => setState(e.target.value)} className="w-full p-2 border rounded">
                <option value="public">Pública</option>
                <option value="private">Privada</option>
            </select>

            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded">
                Crear Historia
            </button>

        </form>



    );

};

export default StoryForm;
