import { Link } from 'react-router-dom';
import ReactImg1 from '../assets/img/logo.jpeg';
import ReactImg2 from '../assets/img/profile.jpg';
import ReactImg3 from '../assets/img/StorySphere.png';
import ReactImg4 from '../assets/img/persona.png';
import { House, BookUp2, MessageCircleMore, Pencil, NotebookPen, BookOpenText, BookUser, Heart, ChartBarStacked, Users, CircleUser, CircleHelp, Settings, LogIn, Search, Bell, Crown } from 'lucide-react';
import '../assets/css/navbarUsuario.css';
import {useAuth} from '../context/AuthContext.jsx';
import {useNavigate} from 'react-router-dom';

const NavbarUsuario = () => {

  const {handleLogout} = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = async () =>{
    handleLogout();
    navigate('/');
  }







  return (
    <div>
      <div className="headerUsuario">
          {/* navbar */}
          <div className="navbar">
            <div><img src={ReactImg3} alt="StorySphere" /></div>
            <ul>
              <li>
                <input type="text" placeholder="Buscar" id="search" />
                <Search />
              </li>
              <li><Link to="/services"><Crown /> PREMIUM</Link></li>
              <li><Bell /></li>
              <li><Link to="/profile"><img src={ReactImg4} alt="persona" /></Link></li>
            </ul>
          </div>
          {/* sidebar */}
          <div className="sidebar">
            <div className="sidebar-header">
              <img src={ReactImg1} alt="logo" />
              <h2>StorySphere</h2>
            </div>
            <ul className="sidebar-links">
              <h4><span>Main Menu</span><div className="separator"></div></h4>
              <li><Link to="/home"><House className='icon' /><span>Home</span></Link></li>
              <li><Link to="/about"><BookUp2 className='icon' /><span>Populares</span></Link></li>
              <li><Link to="/contact"><MessageCircleMore className='icon' /><span>Explorar</span></Link></li>
              <h4><span>Creación</span><div className="separator"></div></h4>
              <li><Link to="/storyForm"><Pencil className='icon' /><span>Crear</span></Link></li>
              <li><Link to="/comunity"><NotebookPen className='icon' /><span>Mis historias</span></Link></li>
              <h4><span>General</span><div className="separator"></div></h4>
              <li><Link to="/stories"><BookOpenText className='icon' /><span>Historias</span></Link></li>
              <li><Link to="/authors"><BookUser className='icon' /><span>Autores</span></Link></li>
              <li><Link to="/favorite"><Heart className='icon' /><span>Favoritos</span></Link></li>
              <li><Link to="/categories"><ChartBarStacked className='icon' /><span>Categorías</span></Link></li>
              <li><Link to="/comunity"><Users className='icon' /><span>Comunidades</span></Link></li>
              <h4><span>Account</span><div className="separator"></div></h4>
              <li><Link to="/profile"><CircleUser className='icon' /><span>Perfil</span></Link></li>
              <li><Link to="/help"><CircleHelp className='icon' /><span>Ayuda</span></Link></li>
              <li><Link to="/settings"><Settings className='icon' /><span>Opciones</span></Link></li>
              <li>
               
                <button onClick={handleLogoutClick} >
                  <LogIn className='icon' /><span>LogOut</span>
                </button>
              </li>
            </ul>
            <div className="user-account">
              <div className="user-profile">
                <img src={ReactImg2} alt="profile" />
                <div className="user-detail">
                  <h3>Eva Murphy</h3> {/* nombre de usuario */}
                  <span>Web Developer</span> {/* rol de usuario */}
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default NavbarUsuario
