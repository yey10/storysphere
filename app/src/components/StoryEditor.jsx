import React, { useState, useRef, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { createEditor, Transforms, Text, Editor, Node } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { toast, ToastContainer } from "react-toastify";
import "../assets/css/form-stories.css";
import { useStory } from "../context/StoryContext";
import { ImageDown } from 'lucide-react';

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
  /*const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];*/

  const location = useLocation();
  const storyData = location.state?.story || null;

  const { addStory, editStory, categories } = useStory();
  const isEditing = !!storyData; 


  const [title, setTitle] = useState(storyData?.title || "");
  const [sinopsis, setSinopsis] = useState(storyData?.sinopsis || "");
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(storyData?.state || "active");
  const [selectedCategories, setSelectedCategories] = useState(
    storyData?.categories.map((c) => c.id_category) || []
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [content, setContent] = useState(
    storyData?.content
      ? [{ type: "paragraph", children: [{ text: storyData.content }] }]
      : [{ type: "paragraph", children: [{ text: "" }] }]
  );

  const handleChange = useCallback((newValue) => {
    setContent(newValue);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  //Guardar la historia
  const handleSave = async () => {
    const plainText = content.map((node) => Node.string(node)).join("\n")
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", plainText);
    formData.append("sinopsis", sinopsis);
    formData.append("state", state);

    selectedCategories.forEach((categoryId, index) => {
      formData.append(`categories[${index}]`, categoryId);
    });

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      if (isEditing) {
        await editStory(storyData.id_story, formData);
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

  //file
  const inputRef = useRef(null);
  const dropAreaRef = useRef(null);

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add("active");
    }
  };

  const handleDragLeave = () => {
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove("active");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const processFile = (file) => {
    const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (validExtensions.includes(file.type)) {
      setPhoto(file); // Guardar el archivo en su estado original
    } else {
      alert("This is not an Image File!");
      if (dropAreaRef.current) {
        dropAreaRef.current.classList.remove("active");
      }
    }
  };


  return (
    <div>
      <div className="create-storie">
        <h1 className="title">Crea Tu Historia</h1>
        <div className="form-container">
          <div
            className="drag-area"
            ref={dropAreaRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {photo ? (
              <img src={photo} alt="Uploaded" />
            ) : (
              <>
                <ImageDown />
                <h3>Arrastra y suelta una imagen o selecciona una</h3>
                <p>Agrega una portada a tu historia</p>
                <button onClick={handleButtonClick}>Importar</button>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={inputRef}
                  onChange={handlePhotoChange}
                />
              </>
            )}
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
                {categories.map((category) => (
                  <option key={category.id_category} value={category.id_category}>
                    {category.category_name}
                  </option>
                ))}
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
