import { createContext, useContext, useEffect, useState } from "react";
import { getAllUsers, getUserById, getUserProfile, updateUserProfile, deleteUserAccount, updateUserRole } from '../api/userService';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() =>{
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [usersData, userData] = await Promise.all([getAllUsers(), getUserProfile()]);
                console.log("Usuario cargado:", userData);
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

    const updateUser = async (id, data) =>{
        try {
            const updatedUser = await updateUserProfile(id, data);
            setUser(updatedUser);
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    const changeUserRole  = async (id, data) =>{
        try {
            const updatedUser = await updateUserRole(id, data);
            setUser(updatedUser);
        } catch (error) {
            throw error;
        }
    }

    const deleteUser = async (id) =>{
        try {
            await deleteUserAccount(id);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
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