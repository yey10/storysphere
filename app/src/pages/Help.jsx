import React from 'react'
import { Link } from 'react-router-dom'
import DynamicNavbar from '../components/DynamicNavbar.jsx'
import Footer from '../components/Footer.jsx'
import ParticlesBackground from '../components/ParticlesBackground.jsx'
import '../assets/css/help.css'
import ManualPdf from '/Manual_de_Usuario_StorySphere.pdf'
import Loader from '../components/Loader.jsx'

const downloadPdf = () => {
  const pdfUrl = "/Manual_de_Usuario_StorySphere.pdf"; // Asegúrate de que el archivo está en /public
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "Manual_de_Usuario_StorySphere.pdf"; // Nombre del archivo al descargar
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Help = () => {
  
  return (
    <div>
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
          <DynamicNavbar />
          <main className='container mx-auto px-4 py-8'>

            <div className='help'>
              <h1 className='title'>¿Necesitas ayuda con el funcionamiento de la página?</h1>
              <div className='manual-usuario'>
                <h3 className='title'>Manual de Usuario</h3>
                <iframe src={ManualPdf}></iframe>
                <button onClick={downloadPdf}>📥 Descargar PDF</button>
              </div>
            </div>

            <div className="help2">
              <h2 className='title'>Contacto</h2>
              <p>También puedes contactarnos por medio de nuestro correo electronico o demás medios de comunicación, ingresa a la página de contacto y podrás contactarnos directamente</p>
              <button className='buttonLight'><Link to="/contacto">Ir a la página de contacto</Link></button>
            </div>

            <Footer />

          </main>
        </div>
      </div>
      
    </div>
  )
}

export default Help
