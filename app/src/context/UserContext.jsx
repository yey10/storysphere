import { createContext, useContext, useEffect, useState } from "react";
import { getAllUsers, getUserById, getUserProfile, updateUserProfile, deleteUserAccount, updateUserRole } from '../api/userService';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{
        fetchUsers();
    }, []);

    const fetchUsers = async () =>{
        try {
            const usersData = await getAllUsers();
            setUsers(usersData);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchUserById = async (id, data) =>{
        try {
            const userData = await getUserById(id);
            setUser(userData);
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
        }
    }

    const userProfile = async () =>{
        try {
            const userData = await getUserProfile();
            setUser(userData);
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
        }
    }

    const updateUser = async (id, data) =>{
        try {
            const updatedUser = await updateUserProfile(id, data);
            setUser(updatedUser);
        } catch (error) {
            throw error;
        }
    }

    const updateUserRole = async (id, data) =>{
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
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            throw error;
        }
    }

    return (
        <UserContext.Provider value={{
            users,
            user,
            fetchUserById,
            userProfile,
            updateUser,
            updateUserRole,
            deleteUser,
            isLoading}}>
                {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);