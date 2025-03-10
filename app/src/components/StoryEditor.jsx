import React, { useState, useMemo, useCallback } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { toast } from "react-toastify";
import "../assets/css/form-stories.css";
import { useStory } from "../context/StoryContext";

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
  const [state, setState] = useState("draft");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const editor = useMemo(() => withReact(createEditor()), []);

  const [content, setContent] = useState(initialValue);

  // 🛠️ Evitar renders innecesarios con useCallback
  const handleChange = useCallback((newValue) => {
    setContent(newValue);
  }, []);

  //Guardar la historia
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", JSON.stringify(content));
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
    </div>
  );
};

export default StoryEditor;
