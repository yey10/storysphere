import React from 'react'
import ParticlesBackground from '../../components/ParticlesBackground'
import DynamicNavbar from '../../components/DynamicNavbar'
import Footer from '../../components/Footer'
import FavoriteData from '../../components/FavoriteData'
import { historiasFavoritas, historiasMeGusta } from '../../data/favorite'
import '../../assets/css/favorite.css'

const Favorite = () => {
  return (
    <div>
        <div className="min-h-screen bg-black relative">
            <ParticlesBackground />
            <div className="relative z-10">
                <DynamicNavbar />
                <main className="container mx-auto px-4">
                  <div className="favorite-page">
                    <h1 className='title'>Tus Historias Favoritas</h1>
                    <FavoriteData/>
                  </div>
                  
                  <Footer />
                </main>
            </div>
        </div>
    </div>
  )
}

export default Favorite
