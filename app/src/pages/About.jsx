import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ParticlesBackground from '../components/ParticlesBackground';
import SliderAbout from '../components/SliderAbout';
import Footer from '../components/Footer';
import Logo from '../assets/img/Logo.png';
import '../assets/css/about.css';


const About = () => {
  return (
    <>
      <div className="about-1">
        <div className='about1-content'>
          <div className='blur'></div>
          <img src={Logo} alt="Logo" />
          <h1 className='title'>Donde las historias cobran vida</h1>
        </div>
      </div>
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
          <Navbar />
          <main className="container mx-auto px-4">
            <div className="about">
                <div className="about-2 bg">
                    <h2 className='title'>¿QUIÉNES SOMOS?</h2>
                    <p>StorySphere es una plataforma web innovadora diseñada para que escritores y lectores de todo el mundo puedan crear, compartir y descubrir historias originales. El proyecto tiene como objetivo fomentar una comunidad creativa y colaborativa, donde los usuarios puedan interactuar entre sí a través de las historias que publican, compartiendo experiencias, ideas y apoyándose mutuamente en su desarrollo como escritores.</p>
                </div>

                <div className="about-3">
                  <div className="mision">
                      <h2 className='title'>NUESTRA MISIÓN</h2>
                      <p>Proporcionaremos una plataforma fácil de usar y con suficientes recursos para la creación y utilización de la página y el contenido en línea, nos comprometemos a crear un espacio seguro y acogedor para los escritores y lectores sin importar su nivel de experiencia, tratamos de mantener un índice de calidad muy alta, promoviendo la creatividad e interacción en la página con anuncios comunitarios y celebraciones creativas de distintas formas.</p>
                  </div>
                  <div className="vision">
                      <h2 className='title'>NUESTRA VISIÓN</h2>
                      <p>Nos gustaría llegar a ser una red social de gran popularidad, e incluso llegar a ser la principal plataforma en línea donde los amantes de las historias y la lectura puedan ingresar y encontrar la inspiración para ser uno más de la comunidad y seguir creciendo creativamente. Queremos crear un sitio web tranquilo y elegante donde cada usuario pueda relajarse o estimularse con cada historia, que pueda brillar al mundo tecnológico y social y así poder llegar a los corazones de los lectores.</p>
                  </div>
                </div>

                <div className="about-4 bg">
                  <h2 className='title'>NUESTROS SERVICIOS</h2>
                  <p>Además de su enfoque creativo, la plataforma ofrece un sistema de suscripciones premium con acceso a características exclusivas, tales como historias descargables para lectura offline, eventos en línea, concursos de escritura, y acceso prioritario a nuevas funcionalidades.</p>
                  <button><Link to="/services">Premium</Link></button>
                </div>

                <div className="about-5">
                  <h2 className='title'>HISTORIA DE STORYSPHERE</h2>
                  <p>El proyecto fue iniciado desde el 2024, pues es un proyecto con fines educativos, dispuesto unicamente para la realización de un Proyecto que presentar para la graduación de 3 estudiantes en su curso, aun no se espera que sea una gran idea innovadora, su objetivo es completamente educativo.</p>
                  <p>Deseamos crear una red social de lectores y escritores apasionados, basandonos en wattpad y reddit como red social, buscamos hacer mejoras a estos sitios web y adaptarlas al nuestro</p>
                </div>

                <SliderAbout />
            </div>

            <Footer />

          </main>
        </div>
      </div>
    </>
  )
}

export default About
