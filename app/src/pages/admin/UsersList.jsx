import React, {useState, useEffect} from 'react'
import { useUser } from "../../context/UserContext";
import { Table, Button, Switch, Select, message } from "antd";
import AdminLayout from './AdminLayout';

const { Option } = Select;

const UsersList = () => {

  const { users, setUsers, deleteUser, isLoading, changeUserStatus, changeUserRole } = useUser();
  const [localUsers, setLocalUsers] = useState([]);

  const rolesList = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Usuario" },
  ];

  useEffect(() => {
    if (users) {
      setLocalUsers(users);
    }
  }, [users]);

  const toggleUserStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const updatedUser = await changeUserStatus(id, { account_status: newStatus });

      if (!updatedUser) throw new Error("No se pudo actualizar el estado");

      message.success("Estado actualizado correctamente");

      setUsers(prevUsers =>
        prevUsers.map(user =>
            user.id_user === id ? { ...user, account_status: newStatus } : user
        )
      );
      
    } catch (error) {
      message.error("Error al actualizar el estado");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await changeUserRole(id, { id_rol: newRole });
      message.success("Rol actualizado correctamente");

      setLocalUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id_user === id ? { ...user, id_rol: newRole } : user
        )
      );
    } catch (error) {
      message.error("Error al actualizar el rol");
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
            title: "Rol",
            dataIndex: "id_rol",
            render: (roleId, record) => {
              // Obtener el nombre del rol actual
              const currentRole = rolesList.find(role => role.id === roleId)?.name_rol || "Desconocido";

              return (
                <Select
                  value={roleId} // Usar el ID del rol actual
                  onChange={(newRole) => handleRoleChange(record.id_user, newRole)}
                  style={{ width: 150 }}
                >
                  {rolesList.map((role) => (
                    <Option key={role.id} value={role.id}>
                      {role.name}
                    </Option>
                  ))}
                </Select>
              );
            },
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