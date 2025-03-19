import { useState } from "react";
import { Link } from "react-router-dom";
import { usePasswordReset } from '../../context/PasswordResetContext';
import '../../assets/css/password.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const {handleRequestPasswordReset, message, error} = usePasswordReset();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await handleRequestPasswordReset(email);
    };

    return (
        <div className="password-container">
            <div className="form">
                <h1>Forgot Password</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <button type="submit">Request Password Reset</button>
                </form>
                <Link to="/login">Volver</Link>
                {message && <p style={{ color: "green" }}>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
