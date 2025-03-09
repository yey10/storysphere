import React, {useState, useRef} from 'react';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import "quill/dist/quill.snow.css";
import '../assets/css/quill-custom.css'
import '../assets/css/form-stories.css'
import {useStory} from '../context/StoryContext';

const StoryEditor = ({  onSave}) => {
    const {addStory, editStory, categories} = useStory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [photo, setPhoto] = useState('');
    const [state, setState] = useState('draft');
    const [error, setError] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState('');
    const quillRef = useRef(null);

    //Guardar la historia
    const handleSave = async () =>{
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('sinopsis', sinopsis);
        formData.append('state', state);
        selectedCategories.forEach((categoryId, index) => {
            formData.append(`categories[${index}]`, categoryId);
        });
        if(photo){
            formData.append('photo', photo);
        }

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            await addStory(formData);
            onSave();
            toast.success('Historia guardada con éxito'); // Notificación de éxito
        } catch (error) {
            console.error('Error guardando la historia:', error);
            toast.error('Error al guardar la historia. Por favor, verifica los datos.'); // Notificación de error
        }
    };

    //manejar la seleccion de la foto
    const handlePhotoChange = (e) =>{
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
        }
    };

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategories(prev => {
          if (prev.includes(categoryId)) {
            return prev.filter(id => id !== categoryId); // Deseleccionar la categoría
          } else {
            return [...prev, categoryId]; // Seleccionar la categoría
          }
        });
    };

    return(
        <div className='form-container'>
            
            <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <textarea placeholder="Sinopsis" value={sinopsis} onChange={(e) => setSinopsis(e.target.value)}/>
            <input type="file" accept="image/*" onChange={handlePhotoChange}/>
            <div>
                <h3>Selecciona categorías:</h3>
                {categories.map(category => (
                <label key={category.id_category}>
                    <input
                    type="checkbox"
                    value={category.id_category}
                    checked={selectedCategories.includes(category.id_category)}
                    onChange={handleCategoryChange}
                    />
                    {category.category_name}
                </label>
                ))}
            </div>
            <ReactQuill ref={quillRef} value={content} onChange={setContent} 
                modules={{
                    toolbar: {
                        container: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image'],
                        ['clean'],
                        ],
                    },
                }}
                formats={[
                'header',
                'bold', 'italic', 'underline', 'strike',
                'list', 'bullet',
                'link', 'image',
                ]}
                placeholder="Escribe tu historia aquí..."
            />
            <button onClick={handleSave}>Guardar</button>
        
        </div>
    );
};

export default StoryEditor;