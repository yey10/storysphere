import React, { useState, useEffect } from 'react';
import '../assets/css/login.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Ajustes de formulario inicial según el tamaño de la ventana
    if (windowWidth <= 850) {
      setIsRegister(false);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  return (
    <div className="container-login">
      <div className="container-content">
        {/* Caja trasera de Login y registro */}
        <div className="box">
          {/* Caja de Login */}
          <div className="box-login" style={{ display: windowWidth > 850 || !isRegister ? 'block' : 'none' }}>
            <h2>¿Ya tienes una cuenta?</h2>
            <p>Inicia sesión para que puedas navegar dentro del sitio web</p>
            <button onClick={() => setIsRegister(false)}>Iniciar sesión</button>
          </div>
          {/* Caja de Registro */}
          <div className="box-register" style={{ display: windowWidth > 850 || isRegister ? 'block' : 'none' }}>
            <h2>¿Aun no tienes una cuenta?</h2>
            <p>Registrate para que puedas navegar dentro del sitio web</p>
            <button onClick={() => setIsRegister(true)}>Registrarse</button>
          </div>
        </div>

        {/* Formularios de Login y Registro */}
        <div className="form" style={{ left: isRegister && windowWidth > 850 ? '410px' : '10px' }}>
          {/* Formulario de Login */}
          <form className={`form-login ${isRegister ? 'hidden' : ''}`}>
            <h2>Iniciar Sesión</h2>
            <input type="email" placeholder="Correo electrónico" required />
            <input type="password" placeholder="Contraseña" required />
            <button type="submit">Iniciar sesión</button>
          </form>

          {/* Formulario de Registro */}
          <form className={`form-register ${!isRegister ? 'hidden' : ''}`}>
            <h2>Registrarse</h2>
            <input type="text" placeholder="Nombre de Usuario" required />
            <input type="email" placeholder="Correo electrónico" required />
            <input type="password" placeholder="Contraseña" required />
            <input type="password" placeholder="Confirmar contraseña" required />
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
