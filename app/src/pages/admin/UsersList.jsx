import React, {useState, useEffect} from 'react'
import { useUser } from "../../context/UserContext";
import { Table, Button, Switch, message } from "antd";
import AdminLayout from './AdminLayout';

const UsersList = () => {

  const { users, updateUser, deleteUser, isLoading } = useUser();
  const [localUsers, setLocalUsers] = useState([]);

  useEffect(() => {
    if (users) {
      setLocalUsers(users);
    }
  }, [users]);

  const toggleUserStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await updateUser(id, { account_status: newStatus });
      message.success("Estado actualizado correctamente");

      // Actualiza el estado local
      setLocalUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id_user === id ? { ...user, account_status: newStatus } : user
        )
      );
    } catch (error) {
      message.error("Error al actualizar el estado");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      message.success("Usuario eliminado correctamente");

      // Actualiza el estado local
      setLocalUsers((prevUsers) => prevUsers.filter((user) => user.id_user !== id));
    } catch (error) {
      message.error("No se pudo eliminar el usuario");
    }
  };

  if (isLoading) return <div>Cargando...</div>;
  //if (!localUsers || localUsers.length === 0) return <div>No hay usuarios disponibles.</div>;
  
    return (
    <AdminLayout>
          <h2>Usuarios</h2>
          <Table
            dataSource={localUsers}
            rowKey="id_user"
            columns={[
              { title: "ID", dataIndex: "id_user" },
              { title: "Nombre", dataIndex: "name" },
              { title: "Email", dataIndex: "email" },
              {
                title: "Estado",
                dataIndex: "account_status",
                render: (status, record) => (
                  <Switch
                    checked={status === "active"}
                    onChange={() => toggleUserStatus(record.id_user, status)}
                  />
                ),
              },
              {
                title: "Acciones",
                render: (_, record) => (
                  <Button danger onClick={() => handleDeleteUser(record.id_user)}>
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