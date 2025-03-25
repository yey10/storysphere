import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { StoryProvider } from '../context/StoryContext';
import { LikeProvider } from '../context/LikeContext';
import { RatingsProvider } from '../context/RatingsContext.jsx';
import { CommentProvider } from '../context/CommentContext.jsx';
import { UserProvider } from '../context/UserContext.jsx';
import ProtectedRoute from "../ProtectedRoute";
import HomeUsuario from '../pages/usuario/Home.jsx';
import Popular from '../pages/usuario/Popular.jsx';
import Explore from '../pages/usuario/Explore.jsx';
import CreateStoryPage from '../pages/usuario/CreateStoryPage.jsx';
import StoriesUsuario from '../pages/usuario/Stories.jsx';
import UserStorieslist from '../pages/UserStoriesList.jsx';
import StoryPage from '../pages/usuario/StoryPage.jsx';
import Categories from '../pages/usuario/Categories.jsx';
import StoriesByCategory from '../pages/usuario/StoriesByCategory.jsx';
import Favorite from '../pages/usuario/Favorite.jsx';
import Profile from '../pages/usuario/Profile.jsx';


const PrivateRoutes = () => {
  console.log("Renderizando PrivateRoutes...");
  return (
    <LikeProvider> {/* ← Primero LikeProvider */}
      <StoryProvider> {/* ← Luego StoryProvider (que depende de useLikes) */}
        <RatingsProvider>
          <CommentProvider>
            <UserProvider>
                <Routes>
                  <Route element={<ProtectedRoute allowedRoles={["User"]} />}>
                    <Route path="home" element={<HomeUsuario />} />
                    <Route path="popular" element={<Popular />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="createStory" element={<CreateStoryPage />} />
                    <Route path="userStories" element={<UserStorieslist />} />
                    <Route path="stories" element={<StoriesUsuario />} />
                    <Route path="story/:id" element={<StoryPage />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="category/:id" element={<StoriesByCategory />} />
                    <Route path="favorite" element={<Favorite />} />
                    <Route path="profile" element={<Profile />} />
                  </Route>
                </Routes>
              </UserProvider>
          </CommentProvider>
        </RatingsProvider>
      </StoryProvider>
    </LikeProvider>
  );
};

export default PrivateRoutes;
