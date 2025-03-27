import { createContext, useContext, useEffect, useState } from "react";
import { getAllUsers, getUserById, getUserProfile, updateUserProfile, deleteUserAccount, updateUserRole } from '../api/userService';
import { message } from "antd";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() =>{
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [usersData, userData] = await Promise.all([
                    getAllUsers(),
                    getUserProfile()
                ]);
                console.log("Usuarios obtenidos:", usersData);
                if (!usersData) throw new Error("La respuesta de getAllUsers() está vacía");
                
                setUsers(usersData);
                setUser(userData);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    // Obtener el perfil del usuario actual al montar el componente
  /*useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Función para obtener todos los usuarios
  const fetchUsers = async () => {
    try {
      const usersData = await getAllUsers();
      setUsers(usersData); // Actualiza el estado local
      return usersData; // Devuelve los datos para React Query
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      throw error; // Propaga el error para que React Query lo maneje
    }
  };*/


    const fetchUserById = async (id) =>{
        try {
            const userData = await getUserById(id);
            setUser(userData);
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
        }
    }

    const updateUser = async (id, data) =>{
        try {
            const updatedUser = await updateUserProfile(id, data);
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    const changeUserRole  = async (id, data) =>{
        try {
            const updatedUser = await updateUserRole(id, data);
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id_user === id ? { ...user, ...updatedUser } : user
                )
            );
            setUser(prevUser => (prevUser?.id_user === id ? { ...prevUser, ...updatedUser } : prevUser));
        } catch (error) {
            message.error("Error al actualizar el rol.");
            throw error;
        }
    }

    const deleteUser = async (id) =>{
        try {
            await deleteUserAccount(id);
            return id;
        } catch (error) {
            throw error;
        }
    }

    return (
        <UserContext.Provider value={{
            users,
            user,
            fetchUserById,
            updateUser,
            changeUserRole,
            deleteUser,
            isLoading
        }}>
                {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);