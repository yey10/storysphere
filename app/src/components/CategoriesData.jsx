import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import 'animate.css'

const CategoriesData = ({ categories }) => {
  
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
