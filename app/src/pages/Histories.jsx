import React from 'react'
import DynamicNavbar from '../components/DynamicNavbar.jsx';
import ParticlesBackground from '../components/ParticlesBackground';
import SliderStories from '../components/Sliders/SliderStories.jsx';
import { featuredHistories, recommendedHistories, recentHistories } from '../data/histories';
import '../assets/css/histories.css';

const Histories = () => {
  return (
    <div>
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className="relative z-10">
          <DynamicNavbar />
          <main className="container-histories mx-auto px-4 py-8">
            <div className='histories'>
              <SliderStories title="Featured Histories" movies={featuredHistories} />
              <SliderStories title="Recommended for You" movies={recommendedHistories} />
              <SliderStories title="Recently Added" movies={recentHistories} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Histories
