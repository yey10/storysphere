import { useState, useEffect } from "react";
import { Modal, Button, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CLOUD_NAME = "dskr3jxir";
const UPLOAD_PRESET = "storysphere";
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const EditProfileModal = ({ user, visible, onClose, onUpdate }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    biography: "",
    profile_photo: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        biography: user.biography || "",
        profile_photo: user.profile_photo || "",
      });
    }
  }, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async ({ file }) => {
    message.loading({ content: "Subiendo imagen...", key: "uploading" });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error al subir la imagen");

      const data = await response.json();
      console.log("✅ Imagen subida a Cloudinary:", data.secure_url);

      setFormData((prev) => ({
        ...prev,
        profile_photo: data.secure_url, // Guardamos la URL de la imagen
      }));

      message.success({ content: "Imagen subida con éxito", key: "uploading" });
    } catch (error) {
      message.error("Error al subir la imagen");
      console.error(error);
    }
  };





  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      message.error("El nombre y el correo electrónico son obligatorios.");
      return;
    }

    console.log("📸 Enviando datos al backend:", formData);
  
    try {
      await onUpdate(user.id_user, formData);
      message.success("Perfil actualizado con éxito");
      onClose();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Error al actualizar el perfil."
      );
    }
  };

  return (
    <Modal
      title="Editar Perfil"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>,
      ]}
    >
      <Input
        placeholder="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="mb-2"
      />
      <Input
        placeholder="Correo Electrónico"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="mb-2"
      />
      <Input.TextArea
        placeholder="Biografía"
        name="biography"
        value={formData.biography}
        onChange={handleChange}
        className="mb-2"
      />
      <Upload 
        beforeUpload={(file) => {
          handleUpload({ file });
          return false;
        }}
        showUploadList={true} 
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Subir Foto</Button>
      </Upload>
    </Modal>
  );
};

export default EditProfileModal;
