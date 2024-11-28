import React from 'react'
import { Link } from 'react-router-dom';
import ReactImg3 from '../assets/img/StorySphere.png';
import '../assets/css/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faXTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div>
          <div className="footer">
            <div className="footer-content">
                <div>
                    <div><FontAwesomeIcon icon={faLocationDot} /><span>Encuentranos</span><p>Lorem ipsum dolor sit amet.</p></div>
                    <div><FontAwesomeIcon icon={faPhone} /><span>Llamanos</span><p>Lorem ipsum dolor sit amet.</p></div>
                    <div><FontAwesomeIcon icon={faEnvelope} /><span>Escribenos</span><p>Lorem ipsum dolor sit amet.</p></div>
                </div>
                <div>
                    <div>
                        <img src={ReactImg3} alt="StorySphere" />
                        <p>Una plataforma web que permite a los usuarios subir, leer y comentar historias, facilitando la interacción entre ellos y fomentando la creatividad literaria.</p>
                        <span>Siguenos</span>
                        <div>
                            <a href=""><FontAwesomeIcon icon={faFacebookF} /></a>
                            <a href=""><FontAwesomeIcon icon={faXTwitter} /></a>
                            <a href=""><FontAwesomeIcon icon={faInstagram} /></a>
                        </div>
                    </div>
                    <div>
                        <span>Enlaces útiles</span>
                        <ul>
                            <li><Link to ="/">Inicio</Link></li>
                            <li><Link to ="/services">Servicios</Link></li>
                            <li><Link to ="/contact">Contacto</Link></li>
                            <li><Link to ="/authors">Autores</Link></li>
                            <li><Link to ="/about">Nosotros</Link></li>
                            <li><Link to ="/categories">Categorías</Link></li>
                            <li><Link to ="/about">Equipo</Link></li>
                            <li><Link to ="/terms">Terminos</Link></li>
                            <li><Link to ="/terms">Privacidad</Link></li>
                            <li><Link to ="/terms">Política</Link></li>
                        </ul>
                    </div>
                    <div>
                        <span>Escríbenos</span>
                        <p>Si quieres enviarnos un mensaje a nuestro WhatsApp de contacto, haslo aquí</p>
                        <input type="text" value="+57 314 782 1614" disabled /><a href="https://wa.me/+573147821614"><FontAwesomeIcon icon={faWhatsapp} /></a>
                    </div>
                </div>
            </div>
            <div className="footer-end">
              <p>Copiright © 2024, All right Reserved StorySphere</p>
            </div>
          </div>
    </div>
  )
}

export default Footer
