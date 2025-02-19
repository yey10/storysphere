import React from 'react'
import ParticlesBackground from '../../components/ParticlesBackground'
import NavbarUsuario from '../../components/NavbarUsuario'

const Home = () => {
  return (
    <div>
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
            <NavbarUsuario />
            <main className="container mx-auto px-4">
                <div className="homeusuario">
                  
                </div>
            </main>
        </div>
      </div>
    </div>
  )
}

export default Home
