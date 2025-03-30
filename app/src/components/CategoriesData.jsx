import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import 'animate.css'
import {useStory} from '../context/StoryContext'

const CategoriesData = () => {
  const {categories} = useStory();
  useEffect(() => {
    categories()
  }, [categories])
  if (!categories || categories.length === 0) return <div>No hay categorías disponibles.</div>;
  
  return (
    <div className='categories'>
      
        {categories.map((category) => (
            <div key={category.id_category} className='category-box'>
                <div className='category-image'><img src={category.image} alt={category.title} /></div>
                <div className='category-info'>
                    <h4 className='title'>{category.title}</h4>
                    <p>{category.description}</p>
                    <button className='buttonLight'><Link to="/login">Ver más</Link></button>
                </div>
            </div>
        ))}

    </div>
  )
}

export default CategoriesData
