import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col } from "antd";
import AdminLayout from "./AdminLayout";
import '../../assets/css/admin.css'

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <Row gutter={[16, 16]} className="cards-grid">
        <Col className="card-content">
          <Card title="Usuarios Registrados" className="Card-admin">
            <button
              onClick={() => navigate("/admin/users")}
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "16px",
                color: "#fff",
              }}
            >
              📊 120 usuarios
            </button>
          </Card>
        </Col>
        <Col className="card-content">
          <Card title="Historias Publicadas" className="Card-admin">
            <button
              onClick={() => navigate("/admin/stories")}
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "16px",
                color: "#fff",
              }}
            >
              📖 450 historias
            </button>
          </Card>
        </Col>
        <Col className="card-content">
          <Card title="Comentarios Totales" className="Card-admin">
            <button
              onClick={() => navigate("/admin/comments")}
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "16px",
                color: "#fff",
              }}
            >
              💬 980 comentarios
            </button>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AdminHome;
