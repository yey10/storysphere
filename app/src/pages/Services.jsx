import React from 'react'
import { Link } from 'react-router-dom';
import DynamicNavbar from '../components/DynamicNavbar';
import Footer from '../components/Footer';
import '../assets/css/services.css';
import { Check } from 'lucide-react';

const Services = () => {
  return (
    <>
        <div className="services">
          <h1 className='title'>Elige tu plan de suscripción</h1>
          <div className="box">
            <div className="box-content">
              <h2>Estándar</h2>
              <p>Perfecto para empezar</p>
              <p>4.99$<small>/mes</small></p>
              <ul>
                <li><Check />Mejor almacenamiento de historias</li>
                <li><Check />Mejor espacio de creación</li>
                <li><Check />Icono especial</li>
              </ul>
              <button><Link to="/login">Suscribirse</Link></button>
            </div>

            <div className="box-content">
              <h2>Medium</h2>
              <p>Ideal para los creadores</p>
              <p>9.99$<small>/mes</small></p>
              <ul>
                <li><Check />Mejor almacenamiento de historias</li>
                <li><Check />Mejor espacio de creación</li>
                <li><Check />Más herramientas de creación</li>
                <li><Check />Acceso a descargas</li>
                <li><Check />Icono especial</li>
              </ul>
              <button><Link to="/login">Suscribirse</Link></button>
            </div>

            <div className="box-content">
              <h2>Premium</h2>
              <p>Exelente Para los profesionales</p>
              <p>14.99$<small>/mes</small></p>
              <ul>
                <li><Check />Más recursos de creación</li>
                <li><Check />Acceso a contenido Premium</li>
                <li><Check />Acceso a descargas más amplias</li>
                <li><Check />Gran almacenamiento de historias</li>
                <li><Check />Gran espacio de creación</li>
                <li><Check />Icono super especial</li>
              </ul>
              <button><Link to="/login">Suscribirse</Link></button>
            </div>
          </div>
        </div>
      <div className="relative z-10">
        <DynamicNavbar />
        <main className="container mx-auto px-4">
          <Footer />
        </main>
      </div>
    </>
  )
}

export default Services
