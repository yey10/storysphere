import { createContext, useContext, useEffect, useState} from "react";
import { login, register, logout } from '../api/authService.jsx'

//Crear el contexto
const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() =>{
        //Verificar que existe el token
        const token = sessionStorage.getItem('token');
        const userData = sessionStorage.getItem('user');
        console.log('Token encontrado en sessionStorage:', token);

        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }else{
            setIsAuthenticated(false);
            setUser(null);
        }
        setIsLoading(false);//finaliza la carga
    }, []);//  El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

    const handleLogin = async (data) =>{
        try {

            const response = await login(data);

            if (response?.access_token) {
                sessionStorage.setItem('token', response.access_token);
                //guardar informacion del usuario en la sesión
                const userData = {
                    id: response.user.id_user,
                    name: response.user.name,
                    email: response.user.email,
                    profile_photo: response.user.profile_photo,
                    birthdate: response.user.birthdate,
                    account_status: response.user.account_status,
                    role: response.user.roles.length > 0 ? response.user.roles[0].name_rol : 'user'
                };
                sessionStorage.setItem('user', JSON.stringify(userData));
                setIsAuthenticated(true);
                setUser(userData);
            }
            
        } catch (error) {
            console.error("Error en el login:", error);
            setIsAuthenticated(false);
            setUser(null);
            throw error;
        }
    }

    const handleRegister = async (data) => {
        try {
          await register(data);
        } catch (error) {
          throw error;
        }
      };

    const handleLogout = () =>{
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        logout();
    }


    // Proveer el estado de autenticación a los componentes hijos
    return (
        <AuthContext.Provider  value={{
            isAuthenticated,
            isLoading,
            user,
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