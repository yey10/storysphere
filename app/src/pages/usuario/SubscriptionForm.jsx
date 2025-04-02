import { useState } from "react";
import { Form, Input, Button, Select, DatePicker, Spin, message } from "antd";
import { useSubscription } from "../../context/SubscriptionContext.jsx";
import dayjs from "dayjs";

const { Option } = Select;

const SubscriptionForm = () => {
    const { addSubscription, isLoading } = useSubscription();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            // Calcular fecha de finalización
            const endDate = dayjs(values.start_date).add(1, 'month').format("YYYY-MM-DD");

            const formattedData = {
                subscription_type: values.subscription_type,
                start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
                end_date: endDate,
            };

            await addSubscription(formattedData);
            message.success("¡Suscripción creada exitosamente!");
            form.resetFields();
        } catch (error) {
            message.error(`Error al crear la suscripción: ${error.message || "Error desconocido"}`);
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                label="Tipo de Suscripción"
                name="subscription_type"
                rules={[{ required: true, message: "Seleccione un tipo de suscripción" }]}
            >
                <Select placeholder="Selecciona un tipo">
                    <Option value="basic">Básico</Option>
                    <Option value="premium">Premium</Option>
                    <Option value="pro">VIP</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Fecha de Inicio"
                name="start_date"
                rules={[{ required: true, message: "Seleccione la fecha de inicio" }]}
            >
                <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={isLoading}>
                    {isLoading ? <Spin /> : "Crear Suscripción"}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SubscriptionForm;
