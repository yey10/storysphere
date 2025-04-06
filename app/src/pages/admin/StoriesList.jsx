import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { useStory } from '../../context/StoryContext';
import { Table, Button, Switch, message } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Storieslist = () => {
  const { stories, isLoading, changeStoryStatus, removeStory } = useStory();
  const [localStories, setLocalStories] = useState([]);

  useEffect(() => {
    setLocalStories(stories || []);
  }, [stories]);

  const toggleStoryStatus = async (id, currentState) => {
    try {
        const newState = currentState === "active" ? "inactive" : "active";
        const updatedStory = await changeStoryStatus(id, { state: newState });
        
        if (!updatedStory) {
          throw new Error("No se pudo actualizar el estado");
        }
        
        message.success("Estado de la historia actualizado correctamente");
        
        setLocalStories((prevStories) =>
            prevStories.map((story) =>
                story.id_story === id ? { ...story, state: updatedStory.state } : story
            )
        );
        
    } catch (error) {
      console.error("Error en toggleUserStatus:", error);
      message.error("Error al actualizar el estado de la historia");
    }
};

  const handleDeleteStory = async (id) => {
    try {
      await removeStory(id);
      message.success("Historia eliminada correctamente");

      // Actualiza el estado local
      setLocalStories((prevStories) => prevStories.filter((story) => story.id_story !== id));
    } catch (error) {
      message.error("No se pudo eliminar la historia");
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Título del documento
    doc.setFontSize(18);
    doc.text("Lista de Historias", 14, 15);

    // Definir las columnas y los datos
    const columns = ["ID", "Título", "Sinopsis", "Autor", "Estado", "Fecha de Creación"];
    const data = localStories.map(story => [
      story.id_story,
      story.title,
      story.sinopsis,
      story.user ? story.user.name : "Desconocido",
      story.state === "active" ? "Activo" : "Inactivo",
      new Date(story.created_at).toLocaleDateString()
    ]);

    // Generar la tabla en el PDF
    autoTable(doc, {
      head: [columns],
      body: data,
      startY: 25,
    });

    // Guardar el PDF
    doc.save("Historias.pdf");

    message.success("Archivo PDF generado correctamente");
  };

  if (isLoading) return <div>Cargando historias...</div>;
  //if (!localStories || localStories.length === 0) return <div>No hay historias disponibles.</div>;
  
  return (
    <AdminLayout>
      <h1 className='title'>Historias</h1>
      <Button type="primary" onClick={exportToPDF} style={{ marginBottom: 16 }}>
        Generar PDF
      </Button>
      <Table
        className='table-admin'
        dataSource={localStories}
        rowKey="id_story"
        columns={[
          { title: "ID", dataIndex: "id_story" },
          { title: "Título", dataIndex: "title" },
          { title: "Sinopsis", dataIndex: "sinopsis" },
          { title: "Autor", dataIndex: ["user", "name"], defaultRender: "Desconocido" },
          {
            title: "Estado",
            dataIndex: "state",
            render: (state, record) => (
              <Switch
                checked={state === "active"}
                onChange={() => toggleStoryStatus(record.id_story, state)}
              />
            ),
          },
          {
            title: "Fecha de Creación",
            dataIndex: "created_at",
            render: (date) => new Date(date).toLocaleDateString(),
          },
          {
            title: "Acciones",
            render: (_, record) => (
              <Button danger onClick={() => handleDeleteStory(record.id_story)}>
                Eliminar
              </Button>
            ),
          },
        ]}
      />
    </AdminLayout>
  )
}

export default Storieslist