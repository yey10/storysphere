import React, { useEffect } from "react";
import { Table, Button, message } from "antd";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AdminLayout from "./AdminLayout";
import '../../assets/css/admin.css';
import { useComment } from "../../context/CommentContext";

const CommentList = () => {
  const {
    comments,
    isLoading,
    removeComment,
    getAllCommentsAdmins
  } = useComment();

  useEffect(() => {
    getAllCommentsAdmins(); 
  }, [getAllCommentsAdmins]);

  const handleDelete = async (id) => {
    try {
      await removeComment(id);
      message.success("Comentario eliminado correctamente");
    } catch {
      message.error("Error al eliminar el comentario");
    }
  }; 

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Lista de Comentarios", 14, 15);

    const columns = ["ID", "Comentario", "Usuario", "Fecha"];
    const data = comments.map(comment => [
      comment.id_comment,
      comment.content_comment,
      comment.user?.name || "Desconocido",
      comment.created_at
    ]);

    autoTable(doc, {
      head: [columns],
      body: data,
      startY: 25,
    });

    doc.save("Comentarios.pdf");
    message.success("PDF generado correctamente");
  };

  return (
    <AdminLayout>
      <h1 className="title">Comentarios</h1>
      <Button type="primary" onClick={exportToPDF} style={{ marginBottom: 16 }}>
        Generar PDF
      </Button>
      <Table
        className="table-admin"
        rowKey="id_comment"
        dataSource={comments}
        loading={isLoading}
        columns={[
          { title: "ID", dataIndex: "id_comment" },
          { title: "Comentario", dataIndex: "content_comment" },
          { title: "Usuario", dataIndex: ["user", "name"], render: name => name || "Desconocido" },
          { title: "Fecha", dataIndex: "created_at" },
          {
            title: "Acciones",
            render: (_, record) => (
              <Button danger onClick={() => handleDelete(record.id_comment)}>
                Eliminar
              </Button>
            ),
          },
        ]}
      />
    </AdminLayout>
  );
};

export default CommentList;
