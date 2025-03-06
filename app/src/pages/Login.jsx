import React, { useState, useEffect } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/login.css';
import { useAuth } from '../context/AuthContext.jsx';
import {useNavigate} from 'react-router-dom';

const Login = () => {

  
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {handleRegister, handleLogin} = useAuth(); //importar las funciones de registro y login para usarlas en el componente
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name : '',
    email : '',
    password : '',
    password_confirm: '',
    biography: '',
    profile_photo:null,
  });//Datos del formulario
 
  

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Ajustes de formulario inicial según el tamaño de la ventana
    if (windowWidth <= 850) {
      setIsRegister(false);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  const toggleForm = ()=>{
    setIsRegister(!isRegister);
    setFormData({
      name : '',
      email : '',
      password : '',
      password_confirm: '',
      biography: '',
      profile_photo:null,
    });
    setErrors({});
  };

  //manejar los cambios en los inputs
  const handleChange = (e) => {
    const {name, value, files} = e.target;
    setFormData({...formData, [name]: files ? files[0] : value});
  }

  //manejar el submit del formulario
  const handleSubmit = async (e) =>{

    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      if (isRegister) {
        if (!formData.password || !formData.password_confirm) {
         toast.error('Por favor, completa ambos campos de contraseña');
          return;
        }
        if(formData.password.lenght < 8){
          toast.error('La contraseña debe tener al menos 8 caracteres');
          return;
        }
        if (formData.password !== formData.password_confirm) {
          toast.error('Las contraseñas no coinciden');
          return;
        }
        if (formData.profile_photo && formData.profile_photo.size > 2 * 1024 * 1024) {
          throw new Error('El tamaño del archivo no debe exceder 2MB');
          return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('biography', formData.biography);
        if (formData.profile_photo) {
          data.append('profile_photo', formData.profile_photo);
        }

        await handleRegister(data, {signal: controller.signal});
        toast.success('Registro exitoso');
        toggleForm();
        /*setFormData({
          name: '',
          email: '',
          password: '',
          password_confirm: '',
          biography: '',
          profile_photo: null,
        });*/
      }else{
        await handleLogin({
          email: formData.email,
          password: formData.password,
        }, {signal: controller.signal});
        toast.success('Inicio de sesión exitoso');
        navigate('/home');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        toast.error('la solicitud tardó demasiado');
        return;
      }

      if(error.response && error.response.data){
        const {message, errors} = error.response.data;
        if(errors){
          setErrors(errors);
          Object.values(errors).flat().forEach(err => toast.error(err));
        }else{
          toast.error(message || 'Ocurrió un error');
        }
      }else{
        toast.error(error.message || 'Error inesperado');
      }
    }finally{
      clearTimeout(timeoutId);
    }
  }

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
          <form className={`form-login ${isRegister ? 'hidden' : ''}`} onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder="Correo electrónico" required />
            {errors.email && <p className="error">{errors.email[0]}</p>}
            <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder="Contraseña" required />
            {errors.password && <p className="error">{errors.password[0]}</p>}
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Formulario de Registro */}
          <form className={`form-register ${!isRegister ? 'hidden' : ''}`} onSubmit={handleSubmit} encType='multipart/form-data'>
            <h2>Registrarse</h2>
            <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder="Nombre de Usuario" required />
            {errors.name && <p className="error">{errors.name[0]}</p>}
            <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder="Correo electrónico" required />
            {errors.email && <p className="error">{errors.email[0]}</p>}
            <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder="Contraseña" required />
            {errors.password && <p className="error">{errors.password[0]}</p>}
            <input type="password" name='password_confirm' value={formData.password_confirm} onChange={handleChange} placeholder="Confirmar contraseña" required />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Cargando...' : 'Registrarse'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
