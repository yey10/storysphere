import React from 'react'
import ParticlesBackground from '../../components/ParticlesBackground'
import DynamicNavbar from '../../components/DynamicNavbar'
import Footer from '../../components/Footer'
import SliderPopular from '../../components/Sliders/SliderPopular'
import SliderPopular2 from '../../components/Sliders/SliderPopular2'
import { populares, ranks } from '../../data/stories'
import { authors } from '../../data/authors'
import '../../assets/css/popular.css'
import PopularData from '../../components/PopularData'

const Popular = () => {
  return (
    <div>
        <div className="min-h-screen bg-black relative">
            <ParticlesBackground />
            <div className="relative z-10">
                <DynamicNavbar />
                <main className="container mx-auto px-4">
                  <div className="popular-page">
                    <div className="popular1">
                      <SliderPopular populares={populares} />
                    </div>

                    <div className="popular2 bg">
                      <h1>Top de Historias Actuales</h1>
                      <p>Las mejores historias aún están por ser descubiertas. Encuentra la tuya ahora.</p>
                      <PopularData ranks={ranks} />
                    </div>

                    <div className="popular3">
                      <SliderPopular2 authors={authors} />
                    </div>
                  </div>

                  <Footer />
                </main>
            </div>
        </div>
    </div>
  )
}

export default Popular
