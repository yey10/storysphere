import React, { useState, useMemo, useCallback } from "react";
import { createEditor, Transforms, Text, Editor, Node } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { toast, ToastContainer } from "react-toastify";
import "../assets/css/form-stories.css";
import { useStory } from "../context/StoryContext";

// 🎨 Componente de Botón
const ToolbarButton = ({ format, icon, editor }) => {
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
};

const StoryEditor = ({ onSave }) => {
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  const { addStory, categories } = useStory();
  const [title, setTitle] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [photo, setPhoto] = useState("");
  const [state, setState] = useState("active");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [content, setContent] = useState(initialValue);

  const handleChange = useCallback((newValue) => {
    setContent(newValue);
  }, []);

  //Guardar la historia
  const handleSave = async () => {
    const plainText = content.map(node => Node.string(node)).join("\n")
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
      await addStory(formData);
      onSave();
      toast.success("Historia guardada con éxito");
    } catch (error) {
      console.error("Error guardando la historia:", error);
      toast.error(
        "Error al guardar la historia. Por favor, verifica los datos."
      );
    }
  };

  // Manejo de foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId) // Deseleccionar
        : [...prev, categoryId] // Seleccionar
    );
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
            <button onClick={handleSave}>Guardar</button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default StoryEditor;
