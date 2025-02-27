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
import Categories from './pages/Categories.jsx';
import CreateStoryPage from './pages/CreateStoryPage.jsx';
import StoryForm from './pages/StoryForm.jsx';
import Profile from './pages/Profile.jsx';
import Help from './pages/Help.jsx';
import Settings from './pages/Settings.jsx';
import HomeUsuario from './pages/usuario/Home.jsx';
import StoriesUsuario from './pages/usuario/Stories.jsx';
import StoryPage from './pages/usuario/StoryPage.jsx';

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
                  <Route path='/categories' element={<Categories />} />
                  <Route path='/createStory' element={<CreateStoryPage />} />
                  <Route path='/storyForm' element={<StoryForm/>} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/help' element={<Help />} />
                  <Route path='/settings' element={<Settings />} />
                </Route>
                
              {/*Rutas públicas*/}
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/services' element={<Services />} />
                <Route path='/histories' element={<Histories />} />
                <Route path='/authors' element={<Authors />} />
              
            </Routes>
          </StoryProvider>          

        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App