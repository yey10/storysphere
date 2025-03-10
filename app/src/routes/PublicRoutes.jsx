import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import Services from '../pages/Services.jsx';
import Histories from '../pages/Histories.jsx';
import Authors from '../pages/Authors.jsx';
import Help from '../pages/Help.jsx';

const PublicRoutes = () => {
  console.log("Renderizando PublicRoutes...");
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/histories" element={<Histories />} />
      <Route path="/authors" element={<Authors />} />
      <Route path="/help" element={<Help />} />
    </Routes>
  );
};

export default PublicRoutes;