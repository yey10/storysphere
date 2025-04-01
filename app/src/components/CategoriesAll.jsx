import React from 'react'
import { useNavigate } from 'react-router-dom'
import Romance1 from '../assets/img/Stories/21.webp'
import Romance2 from '../assets/img/Stories/22.webp'
import Romance3 from '../assets/img/Stories/23.webp'
import Terror1 from '../assets/img/Stories/24.webp'
import Terror2 from '../assets/img/Stories/25.webp'
import Terror3 from '../assets/img/Stories/26.webp'
import Accion1 from '../assets/img/Stories/27.webp'
import Accion2 from '../assets/img/Stories/28.webp'
import Accion3 from '../assets/img/Stories/29.webp'
import Ficcion1 from '../assets/img/Stories/30.webp'
import Ficcion2 from '../assets/img/Stories/31.webp'
import Ficcion3 from '../assets/img/Stories/48.webp'
import Fantasia1 from '../assets/img/Stories/32.webp'
import Fantasia2 from '../assets/img/Stories/33.webp'
import Fantasia3 from '../assets/img/Stories/62.webp'
import Comedia1 from '../assets/img/Stories/63.webp'
import Comedia2 from '../assets/img/Stories/64.webp'
import Comedia3 from '../assets/img/Stories/65.webp'
import Aventura1 from '../assets/img/Stories/59.webp'
import Aventura2 from '../assets/img/Stories/60.webp'
import Aventura3 from '../assets/img/Stories/61.webp'
import Misterio1 from '../assets/img/Stories/3.webp'
import Misterio2 from '../assets/img/Stories/5.webp'
import Misterio3 from '../assets/img/Stories/51.webp'
import Drama1 from '../assets/img/Stories/66.webp'
import Drama2 from '../assets/img/Stories/67.webp'
import Drama3 from '../assets/img/Stories/68.webp'

const categoryImages = {
    Romance: [Romance1, Romance2, Romance3],
    Terror: [Terror1, Terror2, Terror3],
    Acción: [Accion1, Accion2, Accion3],
    Ficción: [Ficcion1, Ficcion2, Ficcion3],
    Fantasía: [Fantasia1, Fantasia2, Fantasia3],
    Comedia: [Comedia1, Comedia2, Comedia3],
    Aventura: [Aventura1, Aventura2, Aventura3],
    Misterio: [Misterio1, Misterio2, Misterio3],
    Drama: [Drama1, Drama2, Drama3]
};

const CategoriesAll = ({categories}) => {
    const navigate = useNavigate();
  
    return (
      <div className="categories">
        {categories.map((category) => (
          <div key={category.id_category} className="categories-content">
            <div>
              <h3 className="title">{category.category_name.toUpperCase()}</h3>
              <p>Lo mejor en {category.category_name} aquí</p>
              <button className="buttonLight" onClick={() => navigate(`/user/category/${category.id_category}`)}>
                ¡VAMOS!
              </button>
            </div>
            <div>
              <div className="background-image"></div>
                <div className="image-content">
                        {(categoryImages[category.category_name] || []).map((image, index) => (
                            <div key={index}>
                            <img src={image} alt={`${category.category_name} ${index + 1}`} />
                            </div>
                        ))}
                </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

export default CategoriesAll
