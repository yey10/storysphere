import React from "react";
import { Layout, Menu, Card, Row, Col, Avatar, Dropdown, Button } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

const menuItems = [
  { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "users", icon: <UserOutlined />, label: "Usuarios" },
  { key: "stories", icon: <FileTextOutlined />, label: "Historias" },
  { key: "settings", icon: <SettingOutlined />, label: "Configuración" },
];

const AdminHome = () => {
  const userMenu = (
    <Menu
      items={[
        { key: "profile", label: "Perfil", icon: <UserOutlined /> },
        { key: "logout", label: "Cerrar sesión", icon: <LogoutOutlined /> },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible>
        <div className="logo" style={{ color: "white", textAlign: "center", padding: "20px", fontSize: "18px" }}>
          Admin Panel
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      {/* Layout Principal */}
      <Layout>
        {/* Navbar */}
        <Header style={{ background: "#fff", padding: "0 20px", display: "flex", justifyContent: "space-between" }}>
          <div>
            <h2>Dashboard</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <BellOutlined style={{ fontSize: "20px" }} />
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Button icon={<Avatar icon={<UserOutlined />} />} />
            </Dropdown>
          </div>
        </Header>

        {/* Contenido */}
        <Content style={{ margin: "20px" }}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card title="Usuarios Registrados" bordered>
                <p>📊 120 usuarios</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Historias Publicadas" bordered>
                <p>📖 450 historias</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Comentarios Totales" bordered>
                <p>💬 980 comentarios</p>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminHome;
