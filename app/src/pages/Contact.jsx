import React from 'react'
import DynamicNavbar from '../components/DynamicNavbar.jsx';
import Footer from '../components/Footer';
import '../assets/css/contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faUser, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faXTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("xzzeaoev");
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-box">
        <input type="text" placeholder="Nombre y apellido" required />
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className='input-box'>
        <input id="email" type="email"  name="email" placeholder="Correo electronico" required />
        <FontAwesomeIcon icon={faEnvelope} />
      </div>
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <div className="input-box">
        <input type="text" placeholder="Asunto" required />
        <FontAwesomeIcon icon={faPenToSquare} />
      </div>
      <div className="input-box">
        <textarea id="message" name="message" cols="30" rows="10" placeholder="Escribe tu mensaje" />
      </div>
      
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting}>
        Enviar Mensaje
      </button>
    </form>
  );
}

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
                      <p><FontAwesomeIcon icon={faEnvelope} /> storysphere.oficial@gmail.com</p>
                  </div>
                  <div className="links">
                      <a href="https://www.facebook.com/profile.php?id=61574244840131"><FontAwesomeIcon icon={faFacebookF} /></a>
                      <a href="https://x.com/Storysphere_ofi"><FontAwesomeIcon icon={faXTwitter} /></a>
                      <a href="https://www.instagram.com/storysphere.oficial/"><FontAwesomeIcon icon={faInstagram} /></a>
                      <a href="https://wa.me/+573147821614"><FontAwesomeIcon icon={faWhatsapp} /></a>
                  </div>
              </div>
              
              <ContactForm />

            </div>
          </div>

          <Footer />
        </main>
      </div>
    </>
  )
}

export default Contact
