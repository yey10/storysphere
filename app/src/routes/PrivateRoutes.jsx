import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { StoryProvider } from '../context/StoryContext';
import { LikeProvider } from '../context/LikeContext';import HomeUsuario from '../pages/usuario/Home.jsx';
import Popular from '../pages/usuario/Popular.jsx';
import Explore from '../pages/usuario/Explore.jsx';
import CreateStoryPage from '../pages/usuario/CreateStoryPage.jsx';
import StoriesUsuario from '../pages/usuario/Stories.jsx';
import StoryPage from '../pages/usuario/StoryPage.jsx';
import Categories from '../pages/usuario/Categories.jsx';
import Favorite from '../pages/usuario/Favorite.jsx';
import Profile from '../pages/usuario/Profile.jsx';


const PrivateRoutes = () =>{
    return (
        <StoryProvider>
          <LikeProvider>
            <Routes>
              <Route path="/home" element={<HomeUsuario />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/createStory" element={<CreateStoryPage />} />
              <Route path="/stories" element={<StoriesUsuario />} />
              <Route path="/story/:id" element={<StoryPage />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </LikeProvider>
        </StoryProvider>
      );
};

export default PrivateRoutes;
