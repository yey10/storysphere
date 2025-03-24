import React from 'react'
import { useUser } from "../../context/UserContext";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, Button, Switch, message } from "antd";
import AdminLayout from './AdminLayout';

const UsersList = () => {

  const { users, fetchUserById, fetchUsers, updateUser, deleteUser, isLoading } = useUser();
  const queryClient = useQueryClient();
  console.log("Usuarios recibidos:", users);

    // React Query para obtener los usuarios
    const { data: userList, isFetching } = useQuery({
        queryKey: ['users'],
        queryFn: async () => users ?? [], // Usa los datos del contexto
        initialData:  users ?? [],
        enabled: !!users, // Solo ejecuta si hay datos en el contexto
    });

    // Mutación para actualizar estado del usuario
    const updateUserMutation = useMutation({
        mutationFn: ({ id, data }) => updateUser(id, data), // Usa el método del contexto
        onSuccess: () => {
            message.success("Estado actualizado correctamente");
            queryClient.invalidateQueries(['users']);
        },
        onError: () => {
            message.error("Error al actualizar el estado");
        }
    });


     // Mutación para eliminar usuario
    const deleteUserMutation = useMutation({
        mutationFn: deleteUser, // Usa el método del contexto
        onSuccess: () => {
            message.success("Usuario eliminado correctamente");
            queryClient.invalidateQueries(['users']);
        },
        onError: () => {
            message.error("No se pudo eliminar el usuario");
        }
    });

    // Función para cambiar estado del usuario
    const toggleUserStatus = (id, currentStatus) => {
        const newStatus = currentStatus === "active" ? "inactive" : "active";
        updateUserMutation.mutate({ id, data: { account_status: newStatus } });
    };

    if (isLoading || isFetching) return <div>Cargando...</div>;
    if (!userList || userList.length === 0) return <div>No hay usuarios disponibles.</div>;

    return (
        <AdminLayout>
          <h2>Usuarios</h2>
          <Table
            dataSource={users}
            rowKey="id_user"
            columns={[
              { title: "ID", dataIndex: "id_user" },
              { title: "Nombre", dataIndex: "name" },
              { title: "Email", dataIndex: "email" },
              {
                title: "Estado",
                dataIndex: "account_status",
                render: (status, record) => (
                  <Switch checked={status === "active"} onChange={() => toggleUserStatus(record.id_user, status)} />
                ),
              },
              {
                title: "Acciones",
                render: (_, record) => (
                  <Button danger onClick={() => deleteUserMutation.mutate(record.id_user)}>
                    Eliminar
                  </Button>
                ),
              },
            ]}
          />
        </AdminLayout>
    );
}

export default UsersList