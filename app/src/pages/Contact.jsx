import React from 'react'
import DynamicNavbar from '../components/DynamicNavbar.jsx';
import Footer from '../components/Footer';
import '../assets/css/contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faUser, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faXTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  return (
    <>
      <div className='contact-bg'></div>
      <div className="relative z-10">
        <DynamicNavbar />
        <main className="container mx-auto px-4">

          <div className='container-contact'>
            <div className="contact">
              <div className="box-info">
                  <h1 className='title'>CONTÁCTE CON NOSOTROS</h1>
                  <div className="data">
                      <p><FontAwesomeIcon icon={faPhone} /> +57 314 7821614</p>
                      <p><FontAwesomeIcon icon={faEnvelope} /> StorySphere@gmail.com</p>
                  </div>
                  <div className="links">
                      <a href=""><FontAwesomeIcon icon={faFacebookF} /></a>
                      <a href=""><FontAwesomeIcon icon={faXTwitter} /></a>
                      <a href=""><FontAwesomeIcon icon={faInstagram} /></a>
                      <a href=""><FontAwesomeIcon icon={faWhatsapp} /></a>
                  </div>
              </div>
              <form action="">
                  <div className="input-box">
                      <input type="text" required placeholder="Nombre y apellido" />
                      <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="input-box">
                      <input type="email" required placeholder="Correo electronico" />
                      <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div className="input-box">
                      <input type="text" required placeholder="Asunto" />
                      <FontAwesomeIcon icon={faPenToSquare} />
                  </div>
                  <div className="input-box">
                      <textarea cols="30" rows="10" placeholder="Escribe tu mensaje" />
                  </div>
                  <button type="submit">Enviar mensaje</button>
              </form>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </>
  )
}

export default Contact
