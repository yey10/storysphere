import { useState } from "react";
import { Form, Input, Button, Select, DatePicker, Spin, message } from "antd";
import { useSubscription } from "../../context/SubscriptionContext.jsx";
import dayjs from "dayjs";
import ParticlesBackground from '../../components/ParticlesBackground'
import DynamicNavbar from '../../components/DynamicNavbar'
import Footer from '../../components/Footer'
import '../../assets/css/form-suscription.css'

const { Option } = Select;

const SubscriptionForm = () => {

    /*
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

    */

    const [paymentMethod, setPaymentMethod] = useState("card");
    const [formData, setFormData] = useState({
        cardNumber: "",
        cardHolder: "",
        expiration: "",
        cvv: "",
        email: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Pago procesado correctamente");
    };

    return (
        <div>
            <div className="min-h-screen bg-black relative">
                <ParticlesBackground />
                <div className="relative z-10">
                    <DynamicNavbar />
                    <main className="container mx-auto px-4">
                        <div className="payment-container">
                            <h2 className='title'>Formulario de Pago</h2>
                            <form onSubmit={handleSubmit} className="payment-form">
                                <div className='payment-usuario'>
                                    <div>
                                        <label>
                                            Nombre
                                            <input type="text" placeholder='Nombres Completos' />
                                        </label>
                                        <label>
                                            Apellido
                                            <input type="text" placeholder='Apellidos Completos' />
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            Correo eléctronico
                                            <input type="email" placeholder='Correo@ejemplo.com' />
                                        </label>
                                        <label>
                                            Dirección de vivienda
                                            <input type="text" placeholder='Dirección Completa' />
                                        </label>
                                    </div>
                                </div>
                                <div className="payment-subscription">
                                    <label>
                                        Seleccione su plan de suscripción
                                        <select name="" id="">
                                            <option value="basic">Basic</option>
                                            <option value="premium">Premium</option>
                                            <option value="pro">VIP</option>
                                        </select>
                                    </label>
                                    <label>
                                        Fecha Inicio
                                        <input type="date" />
                                    </label>
                                    <label>
                                        Fecha Final
                                        <input type="date" />
                                    </label>
                                </div>
                                <div className='payment-method'>
                                    <div className='method-group'>
                                        <div className='method-input'>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="card"
                                                checked={paymentMethod === "card"}
                                                onChange={() => setPaymentMethod("card")}
                                            />
                                            <label>Tarjeta de Crédito/Débito</label>
                                        </div>
                                        <div className="method-input">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="paypal"
                                                checked={paymentMethod === "paypal"}
                                                onChange={() => setPaymentMethod("paypal")}
                                            />
                                            <label>PayPal</label>
                                        </div>
                                    </div>

                                    
                                    {paymentMethod === "card" && (
                                    <div className="card-details">
                                        <label>Número de Tarjeta</label>
                                        <input
                                        type="text"
                                        name="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        required
                                        />
                                    
                                        <label>Nombre en la Tarjeta</label>
                                        <input
                                        type="text"
                                        name="cardHolder"
                                        placeholder="Nombre Completo"
                                        value={formData.cardHolder}
                                        onChange={handleChange}
                                        required
                                        />
                                    
                                        <div className="card-info">
                                        <div>
                                            <label>Fecha de Expiración</label>
                                            <input
                                            type="text"
                                            name="expiration"
                                            placeholder="MM/YY"
                                            value={formData.expiration}
                                            onChange={handleChange}
                                            required
                                            />
                                        </div>
                                        <div>
                                            <label>CVV</label>
                                            <input
                                            type="text"
                                            name="cvv"
                                            placeholder="123"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            required
                                            />
                                        </div>
                                        </div>
                                    </div>
                                    )}
                                    
                                    {paymentMethod === "paypal" && (
                                    <div>
                                        <label>Correo Electrónico de PayPal</label>
                                        <input
                                        type="email"
                                        name="email"
                                        placeholder="correo@ejemplo.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        />
                                    </div>
                                    )}
                                </div>

                                <button type="submit" className="pay-button">Pagar</button>
                            </form>
                        </div>
                    </main>
                </div>

                {/**
                 
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

                 */}
                
            </div>
        </div>
    );
};

export default SubscriptionForm;
