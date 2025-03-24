import React from "react";
import { Layout, Menu, Avatar, Dropdown, Button } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Content, Sider } = Layout;

const menuItems = [
  { key: "dashboard", icon: <DashboardOutlined />, label: <Link to="/admin/home">Dashboard</Link> },
  { key: "users", icon: <UserOutlined />, label: <Link to="/admin/users">Usuarios</Link> },
  { key: "stories", icon: <FileTextOutlined />, label: <Link to="/admin/stories">Historias</Link> },
  { key: "settings", icon: <SettingOutlined />, label: <Link to="/admin/settings">Configuración</Link> },
];

const userMenuItems = [
  { key: "profile", label: "Perfil", icon: <UserOutlined /> },
  { key: "logout", label: "Cerrar sesión", icon: <LogoutOutlined /> },
];

const AdminLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible>
        <div className="logo" style={{ color: "white", textAlign: "center", padding: "20px", fontSize: "18px" }}>
          Admin Panel
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]} items={menuItems} />
      </Sider>

      {/* Layout Principal */}
      <Layout>
        {/* Navbar */}
        <Header style={{ background: "#fff", padding: "0 20px", display: "flex", justifyContent: "space-between" }}>
          <div>
            <h2>Panel de Administración</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <BellOutlined style={{ fontSize: "20px" }} />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button icon={<Avatar icon={<UserOutlined />} />} />
            </Dropdown>
          </div>
        </Header>

        {/* Contenido dinámico */}
        <Content style={{ margin: "20px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
