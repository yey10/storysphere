import React from 'react'
import ParticlesBackground from '../../components/ParticlesBackground'
import DynamicNavbar from '../../components/DynamicNavbar'
import Footer from '../../components/Footer'
import { Search } from 'lucide-react'
import { categories } from '../../data/categories'
import '../../assets/css/categories.css'
import CategoriesAll from '../../components/CategoriesAll'

const Categories = () => {
  return (
    <div>
      <div className="min-h-screen bg-black relative">
        <ParticlesBackground />
        <div className='relative z-10'>
          <DynamicNavbar />
          <main className="container mx-auto px-4">
            <div className='categories-page'>
              <div className='categories1'>
                <h1 className='title'>La categoría que quieras a tu alcance</h1>
                <div className='search'>
                  <form>
                    <input type="text" placeholder='Buscar una historia' />
                    <button type='submit'><Search /></button>
                  </form>
                </div>
                <div className='categories-filter'>
                  {categories.map((category) => (
                    <div key={category.id} className='category'>
                      <p>{category.title}</p>
                    </div>
                  ))}
                  <p>Dale vida a tus historias. Comparte, inspira y descubre nuevas narrativas en StorySphere.</p>
                </div>
              </div>
              
              <div className="categories2">
                <CategoriesAll />
              </div>
            </div>

            <Footer />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Categories
