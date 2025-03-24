import {Routes, Route} from "react-router-dom";
import { StoryProvider } from '../context/StoryContext';
import { UserProvider } from '../context/UserContext.jsx';
import { CommentProvider } from '../context/CommentContext.jsx';
import { RatingsProvider } from '../context/RatingsContext.jsx';
import { LikeProvider } from '../context/LikeContext';
import AdminHome from "../pages/admin/AdminHome";
import UsersList from "../pages/admin/UsersList";
import StoriesList from "../pages/admin/StoriesList";
import ProtectedRoute from "../ProtectedRoute";

const AdminRoutes = () => {
    return (
        <StoryProvider>
            <UserProvider>
                <CommentProvider>
                    <RatingsProvider>
                        <LikeProvider>
                            <Routes>
                                <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
                                    <Route path="home" element={<AdminHome />} />
                                    <Route path="users" element={<UsersList />} />
                                    <Route path="stories" element={<StoriesList />} />
                                </Route>
                            </Routes>
                        </LikeProvider>
                    </RatingsProvider>
                </CommentProvider>
            </UserProvider>
        </StoryProvider>
    );
}

export default AdminRoutes;