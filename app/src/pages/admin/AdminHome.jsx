import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col } from "antd";
import AdminLayout from "./AdminLayout";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="Usuarios Registrados">
            <button
              onClick={() => navigate("/admin/users")}
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              📊 120 usuarios
            </button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Historias Publicadas">
            <button
              onClick={() => navigate("/admin/stories")}
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              📖 450 historias
            </button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Comentarios Totales">
            <p>💬 980 comentarios</p>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AdminHome;
