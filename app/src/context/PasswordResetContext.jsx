import { createContext, useContext, useState } from "react";
import { requestPasswordReset, resetPassword } from "../api/passwordService";

const PasswordResetContext = createContext();

export const PasswordResetProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleRequestPasswordReset = async (email) => {
        try {
            const response = await requestPasswordReset(email);
            setMessage(response.message);
            setError(null);
        } catch (error) {
            setError(error.message || "Error al solicitar restablecimiento de contraseña");
        }
    };

    const handleResetPassword = async (data) =>{
        try {
            const response = await resetPassword(data);
            setMessage(response.message);
            setError(null);
        } catch (error) {
            setError(error.message || "Error al restablecer la contraseña");
        }
    };

    return (
        <PasswordResetContext.Provider value={{
            message,
            error, 
            handleRequestPasswordReset,
            handleResetPassword
                                            }}>
            {children}
        </PasswordResetContext.Provider>
    )
}

export const usePasswordReset = () => useContext(PasswordResetContext);