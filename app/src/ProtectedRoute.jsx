import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

const  ProtectedRoute = () =>{
    const { isAuthenticated, isLoading } = useAuth();
    console.log('ProtectedRoute isAuthenticated:', isAuthenticated);

    if(isLoading){
        return <div>Loading...</div>
    }




    if (!isAuthenticated) {
        return  <Navigate to="/login" />
    }

    return <Outlet/>;
}

export default ProtectedRoute;
