import React from 'react'
import AdminLayout from './AdminLayout';
import { useStory } from '../../context/StoryContext';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, Button, Switch, message } from "antd";

const Storieslist = () => {
  const { stories, isLoading, fetchStories, editStory, removeStory } = useStory();
  const queryClient = useQueryClient();

  console.log("Historias recibidas:", stories);

  // React Query para obtener historias
  const { data: storyList, isFetching } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => stories ?? [], 
    initialData: stories ?? [],
    enabled: !!stories, 
  });


  const updateStoryMutation = useMutation({
    mutationFn: ({ id, data }) => editStory(id, data),
    onSuccess: () => {
      message.success("Estado de la historia actualizado correctamente");
      queryClient.invalidateQueries(["stories"]);
    },
    onError: () => {
      message.error("Error al actualizar el estado de la historia");
    },
  });


  // Mutación para eliminar historia
  const deleteStoryMutation = useMutation({
    mutationFn: removeStory,
    onSuccess: () => {
      message.success("Historia eliminada correctamente");
      queryClient.invalidateQueries(["stories"]);
    },
    onError: () => {
      message.error("No se pudo eliminar la historia");
    },
  });

  const toggleStoryStatus = (id, currentState) => {
    const newState = currentState === "published" ? "draft" : "published";
    updateStoryMutation.mutate({ id, data: { state: newState } });
  };

  if (isLoading || isFetching) return <div>Cargando historias...</div>;
  if (!storyList || storyList.length === 0) return <div>No hay historias disponibles.</div>;

  
  return (
    <AdminLayout>
      <h2>Historias</h2>
      <Table
        dataSource={stories}
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
              <Switch checked={state === "published"} onChange={() => toggleStoryStatus(record.id_story, state)} />
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
              <Button danger onClick={() => deleteStoryMutation.mutate(record.id_story)}>
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