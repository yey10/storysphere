import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Services from './pages/Services.jsx';
import Histories from './pages/Histories.jsx';
import Authors from './pages/Authors.jsx';
import Categories from './pages/Categories.jsx';
import Comunity from './pages/Comunity.jsx';
import Profile from './pages/Profile.jsx';
import Help from './pages/Help.jsx';
import Settings from './pages/Settings.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/*Rutas públicas*/}
            {/*Rutas privadas*/}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/services' element={<Services />} />
            <Route path='/histories' element={<Histories />} />
            <Route path='/authors' element={<Authors />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/comunity' element={<Comunity />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/help' element={<Help />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
