import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { StoryProvider } from './context/StoryContext.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Services from './pages/Services.jsx';
import Histories from './pages/Histories.jsx';
import Authors from './pages/Authors.jsx';
import Categories from './pages/usuario/Categories.jsx';
import CreateStoryPage from './pages/usuario/CreateStoryPage.jsx';
import Help from './pages/Help.jsx';
import Profile from './pages/usuario/Profile.jsx';
import HomeUsuario from './pages/usuario/Home.jsx';
import StoriesUsuario from './pages/usuario/Stories.jsx';
import StoryPage from './pages/usuario/StoryPage.jsx';
import Popular from './pages/usuario/Popular.jsx';
import Explore from './pages/usuario/Explore.jsx';
import Favorite from './pages/usuario/Favorite.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>

          <StoryProvider>
            <Routes>

              {/* Rutas privadas */}
                <Route element={<ProtectedRoute />}>
                  <Route path='/home' element={<HomeUsuario />} />
                  <Route path='/popular' element={<Popular />} />
                  <Route path='/explore' element={<Explore />} />
                  <Route path='/createStory' element={<CreateStoryPage />} />
                  <Route path='/stories' element={<StoriesUsuario/>} />
                  <Route path='/story/:id' element={<StoryPage />} />
                  <Route path='/categories' element={<Categories />} />
                  <Route path='/favorite' element={<Favorite />} />
                  <Route path='/profile' element={<Profile />} />
                </Route>
                
              {/*Rutas públicas*/}
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/services' element={<Services />} />
                <Route path='/histories' element={<Histories />} />
                <Route path='/authors' element={<Authors />} />
                <Route path='/help' element={<Help />} />
            </Routes>
          </StoryProvider>          

        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App