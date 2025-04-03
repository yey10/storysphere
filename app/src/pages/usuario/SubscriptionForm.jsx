import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSubscription } from "../../context/SubscriptionContext.jsx";
import { message } from "antd";
import dayjs from "dayjs";
import ParticlesBackground from '../../components/ParticlesBackground'
import DynamicNavbar from '../../components/DynamicNavbar'
import Footer from '../../components/Footer'
import '../../assets/css/form-suscription.css'

//const { Option } = Select;

const SubscriptionForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addSubscription, isLoading } = useSubscription();

    // Obtener datos enviados desde la página anterior
    const {planName, price} = location.state || {planName: "estandar", price: "4.99"}

    // Estado del formulario
    const [subscriptionType, setSubscriptionType] = useState(planName);
    const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!paymentMethod) {
            message.warning("Selecciona un método de pago antes de continuar.");
            return;
        }

        const endDate = dayjs(startDate).add(1, 'month').format("YYYY-MM-DD");

        const formattedData = {
            subscription_type: subscriptionType,
            price: price,
            start_date: startDate,
            end_date: endDate,
            payment_method: paymentMethod,
        }

        setProcessing(true);
        try {
            await addSubscription(formattedData);
            message.success(`¡Suscripción ${subscriptionType} creada exitosamente por ${price}!`);
            navigate("/user/profile");
        } catch (error) {
            message.error(`Error al crear la suscripción: ${error.message || "Error desconocido"}`);
        } finally{
            setProcessing(false);
        }
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
                            <p>Estás suscribiéndote al plan <strong>{subscriptionType}</strong> por <strong>{price}</strong>.</p>
                            <form onSubmit={handleSubmit} className="payment-form">
                                {/*<div className='payment-usuario'>
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
                                </div>*/}
                                <div className="payment-subscription">
                                    <label>
                                        Plan de Suscripción
                                        <input type="text" value={subscriptionType} disabled />
                                    </label>
                                    <label>
                                        Precio
                                        <input type="text" value={price} disabled />
                                    </label>
                                    <label>
                                        Fecha Inicio
                                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                                    </label>
                                    <label>
                                        Fecha Final Automática
                                        <input type="date" value={dayjs(startDate).add(1, "month").format("YYYY-MM-DD")} disabled/>
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

                                    
                                    {/*paymentMethod === "card" && (
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
                                    )*/}
                                    
                                    {/*paymentMethod === "paypal" && (
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
                                    )*/}
                                </div>

                                <button type="submit" className="pay-button">Pagar</button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionForm;
