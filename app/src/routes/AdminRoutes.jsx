import {Routes, Route} from "react-router-dom";
import AdminHome from "../pages/admin/AdminHome";
import ProtectedRoute from "../ProtectedRoute";

const AdminRoutes = () => {
    return (
        <Routes>
           <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
                <Route path="home" element={<AdminHome />} />
            </Route>
        </Routes>
    );
}

export default AdminRoutes;