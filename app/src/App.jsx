import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { QueryProvider } from "./context/QueryContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import PublicRoutes from "./routes/PublicRoutes.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/*" element={<PublicRoutes />} />

            {/* Rutas protegidas */}
              <Route path="/user/*" element={<PrivateRoutes />} />
              
            {/* Rutas de administrador */}
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;
