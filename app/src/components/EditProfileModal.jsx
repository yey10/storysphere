import { useState, useEffect } from "react";
import { Modal, Button, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EditProfileModal = ({ user, visible, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    biography: "",
    profile_photo: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        biography: user.biography || "",
        profile_photo: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = ({ file }) => {
    setFormData((prev) => ({ ...prev, profile_photo: file.originFileObj }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      message.error("El nombre y el correo electrónico son obligatorios.");
      return;
    }
  
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("biography", formData.biography);
    if (formData.profile_photo) {
      data.append("profile_photo", formData.profile_photo);
    }
  
    try {
      await onUpdate(user.id_user, data);
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
      <Upload beforeUpload={(file) => {
        handleUpload({ file });
        return false;
      }}
      maxCount={1}>
      <Button icon={<UploadOutlined />}>Subir Foto</Button>
      </Upload>
    </Modal>
  );
};

export default EditProfileModal;
