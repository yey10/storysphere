import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { useStory } from '../../context/StoryContext';
import { Table, Button, Switch, message } from "antd";

const Storieslist = () => {
  const { stories, isLoading, fetchStories, changeStoryStatus, removeStory } = useStory();
  const [localStories, setLocalStories] = useState([]);

  useEffect(() => {
    if (stories) {
      setLocalStories(stories);
    }
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

  useEffect(() => {
    if (localStories.length === 0) {
      fetchStories();
    }
  }, [fetchStories, localStories.length]);

  if (isLoading) return <div>Cargando historias...</div>;
  //if (!localStories || localStories.length === 0) return <div>No hay historias disponibles.</div>;
  
  return (
    <AdminLayout>
      <h2>Historias</h2>
      <Table
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