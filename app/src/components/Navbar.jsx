import { Link } from 'react-router-dom';
import ReactImg1 from '../assets/img/logo.jpeg';
import ReactImg2 from '../assets/img/Logo_StorySphere.png';
import ReactImg3 from '../assets/img/StorySphere.png';
import { House, FileBadge, Phone, LayoutGrid, BookOpenText, BookUser, ChartBarStacked, Users, CircleUser, CircleHelp, Settings, LogIn, Search, Menu } from 'lucide-react';
import '../assets/css/navbar.css';

const Navbar = () => {
  return (
    <div>
      <div className="header">
          {/* Menu responsive */}
          <input type="checkbox" id='check' />
          <label htmlFor="check" className='checkbtn'><Menu /></label>

          {/* navbar */}
          <div className="navbar">
            <div><img src={ReactImg3} alt="StorySphere" /></div>
            <ul>
              <li>
                <input type="text" placeholder="Buscar" id="search" />
                <Search />
              </li>
              <li><Link to="/login">INICIAR SESIÓN</Link></li>
              <li><Link to="/login">REGISTRARSE</Link></li>
            </ul>
          </div>

          {/* sidebar */}
          <div className="sidebar">
            <div className="sidebar-header">
              <img src={ReactImg1} alt="logo" />
              <h2>StorySphere</h2>
            </div>
            <ul className="sidebar-links">
              <h4><span>Principal</span><div className="separator"></div></h4>
              <li><Link to="/"><House className='icon' /><span>Home</span></Link></li>
              <li><Link to="/about"><FileBadge className='icon' /><span>Nosotros</span></Link></li>
              <li><Link to="/contact"><Phone className='icon' /><span>Contacto</span></Link></li>
              <li><Link to="/services"><LayoutGrid className='icon' /><span>Servicios</span></Link></li>
              <h4><span>General</span><div className="separator"></div></h4>
              <li><Link to="/histories"><BookOpenText className='icon' /><span>Historias</span></Link></li>
              <li><Link to="/authors"><BookUser className='icon' /><span>Autores</span></Link></li>
              <h4><span>Cuenta</span><div className="separator"></div></h4>
              <li><Link to="/help"><CircleHelp className='icon' /><span>Ayuda</span></Link></li>
              <li><Link to="/login"><LogIn className='icon' /><span>Iniciar Sesión</span></Link></li>
            </ul>
            <div className="user-account">
              <div className="user-profile">
                <img src={ReactImg2} alt="profile" />
                <div className="user-detail">
                  <h3>Visitante: 00</h3>
                  <span>StorySphere</span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar
