import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import 'animate.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Placeholder from '../assets/img/logo.jpeg';

const CategoriesData = ({ categories }) => {
  
  return (
    <div className='categories'>
      
        {categories.map((category) => (
            <div key={category.id_category} className='category-box'>
                <div className='category-image'><LazyLoadImage src={category.image} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' /></div>
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
