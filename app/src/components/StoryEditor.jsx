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
    <div className="form-container">
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
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      <div>
        <h3>Selecciona categorías:</h3>
        {categories.map((category) => (
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
      <Slate editor={editor} initialValue={content} onChange={handleChange}>
        <Editable
          placeholder="Escribe tu historia aquí..."
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            minHeight: "200px",
            borderRadius: "4px",
          }}
        />
      </Slate>
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
};

export default StoryEditor;
