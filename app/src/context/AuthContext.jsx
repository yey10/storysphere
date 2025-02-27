import { createContext, useContext, useEffect, useState} from "react";
import { login, register, logout } from '../api/authService.jsx'

//Crear el contexto
const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        //Verificar que existe el token
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
        setIsLoading(false);//finaliza la carga
    }, []);//  El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

    const handleLogin = async (data) =>{
        try {
            await login(data);
            setIsAuthenticated(true);
        } catch (error) {
            throw error;
        }
    }

    const handleRegister = async (data) =>{
        try {
            await register(data);
        } catch (error) {
            throw error;
        }
    }

    const handleLogout = () =>{
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        logout();
    }


    // Proveer el estado de autenticación a los componentes hijos
    return (
        <AuthContext.Provider  value={{
            isAuthenticated,
            isLoading,
            handleLogin,
            handleRegister,
            handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    );

};
// Crear un hook para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);