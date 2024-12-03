import React from 'react'
import Navbar from '../components/Navbar';
import ParticlesBackground from '../components/ParticlesBackground';
import SliderHistories from '../components/SliderHistories';
import { featuredHistories, recommendedHistories, recentHistories } from '../data/histories';
import '../assets/css/histories.css';

const Histories = () => {
  return (
    <div>
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
          <Navbar />
          <main className="container-histories mx-auto px-4 py-8">
            <div className='histories'>
              <SliderHistories title="Featured Histories" movies={featuredHistories} />
              <SliderHistories title="Recommended for You" movies={recommendedHistories} />
              <SliderHistories title="Recently Added" movies={recentHistories} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Histories
