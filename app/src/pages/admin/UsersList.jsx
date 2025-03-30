import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { Table, Button, Switch, Select, message } from "antd";
import AdminLayout from "./AdminLayout";

const { Option } = Select;

const UsersList = () => {
  const { users, deleteUser, isLoading, changeUserStatus, changeUserRole } = useUser();
  const [localUsers, setLocalUsers] = useState([]);

  const rolesList = [
    { id: 1, name: "Usuario" },
    { id: 2, name: "Administrador" },
  ];

  // Sincroniza localUsers con el contexto solo cuando users cambia
  useEffect(() => {
    setLocalUsers(users || []);
  }, [users]);

  const toggleUserStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const updatedUser = await changeUserStatus(id, { account_status: newStatus });

      if (!updatedUser) {
        throw new Error("No se pudo actualizar el estado");
      }

      message.success("Estado actualizado correctamente");

      // 🔹 Actualiza solo el usuario afectado en el estado local
      setLocalUsers(prevUsers =>
        prevUsers.map(user =>
          user.id_user === id ? { ...user, account_status: updatedUser.account_status } : user
        )
      );
    } catch (error) {
      console.error("Error en toggleUserStatus:", error);
      message.error("Error al actualizar el estado");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
        console.log("Nuevo rol seleccionado:", newRole); // 🛠 Depuración

        const updatedUser = await changeUserRole(id, { id_rol: newRole });

        if (!updatedUser || !updatedUser.user.roles.length) {
            throw new Error("No se pudo actualizar el rol");
        }

        const updatedRoleId = updatedUser.user.roles[0].id_rol;

        message.success("Rol actualizado correctamente");

        setLocalUsers(prevUsers =>
            prevUsers.map(user =>
                user.id_user === id ? { ...user, id_rol: updatedRoleId } : user
            )
        );
    } catch (error) {
        console.error("Error en handleRoleChange:", error);
        message.error("Error al actualizar el rol");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      message.success("Usuario eliminado correctamente");

      // 🔹 Filtra el usuario eliminado
      setLocalUsers(prevUsers => prevUsers.filter(user => user.id_user !== id));
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
            dataIndex: "roles",
            render: (roles, record) => {
              const currentRoleId = roles.length ? roles[0].id_rol : null;
          
              return (
                <Select
                  value={currentRoleId}
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
};

export default UsersList;
