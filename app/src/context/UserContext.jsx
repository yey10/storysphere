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