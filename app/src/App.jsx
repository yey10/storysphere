import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PrivateRoutes from "./routes/PrivateRoutes.jsx";
import PublicRoutes from "./routes/PublicRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/*" element={<PublicRoutes />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/user/*" element={<PrivateRoutes />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
