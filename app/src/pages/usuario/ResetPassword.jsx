import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePasswordReset } from '../../context/PasswordResetContext';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const {handleResetPassword, message, error} = usePasswordReset();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await handleResetPassword({ token, email, password, password_confirmation });
    };

    return (
        <div>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="password" 
                    placeholder="Nueva contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Confirmar contraseña" 
                    value={password_confirmation} 
                    onChange={(e) => setPassword_confirmation(e.target.value)} 
                    required 
                />
                <button type="submit">Restablecer</button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}

export default ResetPassword;