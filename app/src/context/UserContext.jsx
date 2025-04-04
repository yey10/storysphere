import { createContext, useContext, useEffect, useState } from "react";
import { getAllUsers, getUserById, getUserProfile, updateUserProfile, deleteUserAccount, updateUserRole, updateUserStatus } from '../api/userService';
import { message } from "antd";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [usersData, userData] = await Promise.all([
                    getAllUsers(),
                    getUserProfile()
                ]);
    
                if (!Array.isArray(usersData)) {  // 🔹 Validar si es un array
                    throw new Error("La respuesta de getAllUsers() no es un array válido");
                }
    
                // Acceder correctamente a la lista de usuarios
                setUsers(usersData || []);
                setUser(userData.user);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, []);

    const fetchUserById = async (id) =>{
        try {
            const userData = await getUserById(id);
            setUser(userData);
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
        }
    }

    const updateUser = async (user, data) =>{
        try {
            const updatedUser = await updateUserProfile(user, data);
            setUser(prevUser => ({
                ...prevUser,
                name: updatedUser.user.name,
                email: updatedUser.user.email,
                biography: updatedUser.user.biography,
                profile_photo: updatedUser.user.profile_photo, // Asegurar que la foto se actualice
                account_status: updatedUser.user.account_status
            }));
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    const changeUserRole  = async (id, data) => {
        try {

            const updatedUser = await updateUserRole(id, data);

            if (!updatedUser || !updatedUser.user.roles.length) {
                throw new Error("No se pudo actualizar el rol");
            }

            const updatedRoleId = updatedUser.user.roles[0].id_rol;
            
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id_user === id ? { ...user, id_rol: updatedRoleId } : user
                )
            );

            return updatedUser; // ✅ Retornar el usuario actualizado
    
        } catch (error) {
            message.error("Error al actualizar el rol.");
            console.error("Error en changeUserRole:", error);
            throw error;
        }
    };

    const changeUserStatus = async (id, data) =>{
        try {
            
            const response = await updateUserStatus(id, data);
            const updatedUser = response.user; // Acceder al objeto `user`
    
            if (!updatedUser) throw new Error("No se pudo actualizar el estado");
    
            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id_user === id ? { ...user, account_status: updatedUser.account_status } : user
                )
            );
    
            setUser(prevUser => 
                prevUser?.id_user === id ? { ...prevUser, account_status: updatedUser.account_status } : prevUser
            );
    
            return updatedUser; // Retornar el usuario actualizado

        } catch (error) {
            message.error("Error al actualizar el estado.");
            throw error;
        }
    }

    const deleteUser = async (id) =>{
        try {
            await deleteUserAccount(id);
            setUser(prev => ({
                ...prev,
                users: prev.users.filter(user => user.id_user !== id),
                user: prev.user?.id_user === id ? null : prev.user
            }));
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
            changeUserStatus,
            deleteUser,
            isLoading
        }}>
                {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);