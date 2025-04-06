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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

const { Header, Content, Sider } = Layout;

const menuItems = [
  { key: "dashboard", icon: <DashboardOutlined />, label: <Link to="/admin/home">Dashboard</Link> },
  { key: "users", icon: <UserOutlined />, label: <Link to="/admin/users">Usuarios</Link> },
  { key: "stories", icon: <FileTextOutlined />, label: <Link to="/admin/stories">Historias</Link> },
  { key: "comments", icon: <FileTextOutlined />, label: <Link to="/admin/comments">Comentarios</Link> }
];



const AdminLayout = ({ children }) => {

  const navigate = useNavigate();

  const {handleLogout} = useAuth();
  const handleLogoutClick = async () =>{
    handleLogout();
    navigate('/');
  }


  const userMenu = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <span onClick={handleLogoutClick}>Cerrar sesión</span>,
    },
  ];

  return (
    <div className="Admin-page">
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sider collapsible className="sidebar-admin">
          <div className="logo" style={{ color: "white", textAlign: "center", padding: "20px", fontSize: "18px" }}>
            Admin Panel
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]} items={menuItems} className="menu-sidebar-admin" />
        </Sider>
      
        {/* Layout Principal */}
        <Layout style={{ background: "#101010" }}>
          {/* Navbar */}
          <Header style={{ background: "#050505", color: "white", padding: "0 20px", borderBottom: "1px solid #D4AF37", display: "flex", justifyContent: "space-between" }}>
            <div>
              <h2>Panel de Administración</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <BellOutlined style={{ fontSize: "20px" }} />
              <Dropdown menu={{ items: userMenu }} placement="bottomRight">
                <Button icon={<Avatar icon={<UserOutlined />} />} />
              </Dropdown>
            </div>
          </Header>
      
          {/* Contenido dinámico */}
          <Content style={{ margin: "20px" }}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminLayout;
