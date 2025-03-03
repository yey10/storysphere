import { createContext, useContext, useEffect, useState} from "react";
import { login, register, logout } from '../api/authService.jsx'

//Crear el contexto
const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        //Verificar que existe el token
        const token = sessionStorage.getItem('token');
        console.log('Token encontrado en sessionStorage:', token);

        if (token) {
            setIsAuthenticated(true);
        }else{
            setIsAuthenticated(false);
        }
        setIsLoading(false);//finaliza la carga
    }, []);//  El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

    const handleLogin = async (data) =>{
        try {
            const response = await login(data);
            if (response.access_token) {
                sessionStorage.setItem('token', response.access_token);
                setIsAuthenticated(true);
            }
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
        sessionStorage.removeItem('token');
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