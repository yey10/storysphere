import { createContext, useContext, useEffect, useState} from "react";

//Crear el contexto
const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() =>{
        //Verificar que existe el token
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true); //si existe el token el usuario está autenticado
        }else{
            setIsAuthenticated(false); //si no existe el token el usuario no está autenticado
        }
    }, []);//  El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

    // Proveer el estado de autenticación a los componentes hijos
    return (
        <AuthContext.Provider  value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );

};
// Crear un hook para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);