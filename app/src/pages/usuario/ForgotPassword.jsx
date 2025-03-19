import { useState } from "react";
import { usePasswordReset } from '../../context/PasswordResetContext';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const {handleRequestPasswordReset, message, error} = usePasswordReset();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        await handleRequestPasswordReset(email);
    };

    return (
        <div>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <button type="submit">Request Password Reset</button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default ForgotPassword;
