import React, { useState, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { createEditor, Transforms, Text, Editor, Node } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { toast, ToastContainer } from "react-toastify";
import "../assets/css/form-stories.css";
import { useStory } from "../context/StoryContext";

const CLOUD_NAME = "dskr3jxir";
const UPLOAD_PRESET = "storysphere";
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// 🎨 Componente de Botón
/*const ToolbarButton = ({ format, icon, editor }) => {
  const isActive = isMarkActive(editor, format);
  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      style={{
        fontWeight: isActive ? "bold" : "normal",
        margin: "0 5px",
        cursor: "pointer",
      }}
    >
      {icon}
    </button>
  );
};

// 🛠️ Función para activar/desactivar formato
const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Transforms.unsetNodes(editor, format, { match: Text.isText, split: true });
  } else {
    Transforms.setNodes(editor, { [format]: true }, { match: Text.isText, split: true });
  }
};*/

const StoryEditor = ({ onSave}) => {

  const location = useLocation();
  const storyData = location.state?.story || {};

  const { addStory, editStory, categories } = useStory();
  const isEditing = !!storyData; 


  const [title, setTitle] = useState(storyData?.title || "");
  const [sinopsis, setSinopsis] = useState(storyData?.sinopsis || "");
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(storyData?.state || "active");
  const [selectedCategories, setSelectedCategories] = useState(
    storyData?.categories ? storyData.categories.map((c) => c.id_category) : []
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [content, setContent] = useState(
    storyData?.content
      ? [{ type: "paragraph", children: [{ text: storyData.content }] }]
      : [{ type: "paragraph", children: [{ text: "" }] }]
  );


  const handleUpload = async (file) =>{
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Error al subir la imagen");

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error al subir la imagen.");
    }
  }

  const handleChange = useCallback((newValue) => {
    setContent(newValue);
  }, []);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };


  //validar formulario
  const validateForm = () =>{
    const errors = {};

    if (!title.trim() || title.length < 5) {
      errors.title = "El título debe tener al menos 5 caracteres.";
    }
    if (!sinopsis.trim() || sinopsis.length < 10) {
      errors.sinopsis = "La sinopsis debe tener al menos 10 caracteres.";
    }
    if (!content || content.length === 0 || Node.string(content[0]).trim() === "") {
      errors.content = "El contenido de la historia no puede estar vacío.";
    }
    if (selectedCategories.length === 0) {
      errors.categories = "Debes seleccionar al menos una categoría.";
    }
    if (photo && !photo.type.startsWith("image/")) {
      errors.photo = "El archivo seleccionado no es una imagen válida.";
    }

    Object.values(errors).forEach((error) => toast.error(error));
    return Object.keys(errors).length === 0;
  }

  //Guardar la historia
  const handleSave = async () => {
    
    if (!validateForm()) return;

    const plainText = content.map((node) => Node.string(node)).join("\n")
    let imageUrl = storyData?.photo;

    if (photo) {
      const uploadedImageUrl = await handleUpload(photo);
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl;
      } else {
        toast.error("Error al subir la imagen.");
        return;
      }
    }

    const updatedStory = {
      title,
      content: plainText,
      sinopsis,
      state,
      categories: selectedCategories,
      photo: imageUrl,
    };

    console.log("Enviando historia editada al backend:", updatedStory);


    try {
      if (isEditing) {
        await editStory(storyData.id_story, updatedStory);
        toast.success("Historia actualizada con éxito");
      } else {
        await addStory(formData);
        toast.success("Historia guardada con éxito");
      }
      onSave();
    } catch (error) {
      console.error("Error guardando la historia:", error);
      toast.error("Error al guardar la historia.");
    }
  };

  return (
    <div>
      <div className="create-storie">
        <div className="form-container">
          <div className="form-image">
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>
          <div className="form-info">
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Sinopsis"
              value={sinopsis}
              onChange={(e) => setSinopsis(e.target.value)}
            />
            <div className="categories-container">
              <h3>Selecciona categorías:</h3>
              <select multiple value={selectedCategories} onChange={handleCategoryChange}>
              {categories?.length > 0 ? (
              categories.map((category) => (
                <option key={category.id_category} value={category.id_category}>
                  {category.category_name}
                </option>
              ))
              ) : (
                <option disabled>Cargando categorías...</option>
              )}
              </select>
            </div>
          </div>
        </div>
        <div className="form-content">
          <Slate editor={editor} initialValue={content} onChange={handleChange}>
            <Editable
              placeholder="Escribe tu historia aquí..."
              style={{
                Width: "100%",
                border: "1px solid #ccc",
                padding: "10px",
                minHeight: "400px",
                borderRadius: "4px",
                marginBottom: "20px",
              }}
            />
          </Slate>
          <div>
          <button onClick={handleSave}>
              {isEditing ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default StoryEditor;
