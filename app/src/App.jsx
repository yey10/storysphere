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
import Help from './pages/Help.jsx';
import PrivateRoutes from './routes/PrivateRoutes.jsx';
import PublicRoutes from './routes/PublicRoutes.jsx';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<PrivateRoutes />} />
          </Route>

          {/* Rutas públicas */}
          <Route path="/*" element={<PublicRoutes />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App