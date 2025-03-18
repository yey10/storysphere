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

const CategoriesAll = () => {

    const navigate = useNavigate();

    const handleNavigate = (category) => {
        navigate(`/user/category/${category}`);
    };

  return (
    <div className="categories">
        <div className='categories-content'>
            <div>
                <h3 className='title'>ROMANCE</h3>
                <p>Lo mejor en Romance aquí</p>
                <button className="buttonLight" onClick={() => handleNavigate('Romance')}>¡VAMOS!</button>
            </div>
            <div>
                <div className='background-image'></div>
                <div className='image-content'>
                    <div><img src={Romance1} alt="" /></div>
                    <div><img src={Romance2} alt="" /></div>
                    <div><img src={Romance3} alt="" /></div>
                </div>
            </div>
        </div>
            
        <div className='categories-content'>
            <div>
                <h3 className='title'>TERROR</h3>
                <p>Lo mejor en Terror aquí</p>
                <button className="buttonLight" onClick={() => handleNavigate('Terror')}>¡VAMOS!</button>
            </div>
            <div>
                <div className='background-image'></div>
                <div className='image-content'>
                    <div><img src={Terror1} alt="" /></div>
                    <div><img src={Terror2} alt="" /></div>
                    <div><img src={Terror3} alt="" /></div>
                </div>
            </div>
        </div>
            
        <div className='categories-content'>
            <div>
                <h3 className='title'>ACCIÓN</h3>
                <p>Lo mejor en Acción aquí</p>
                <button className="buttonLight" onClick={() => handleNavigate('Accion')}>¡VAMOS!</button>
            </div>
            <div>
                <div className='background-image'></div>
                <div className='image-content'>
                    <div><img src={Accion1} alt="" /></div>
                    <div><img src={Accion2} alt="" /></div>
                    <div><img src={Accion3} alt="" /></div>
                </div>
            </div>
        </div>
            
        <div className='categories-content'>
            <div>
                <h3 className='title'>FICCIÓN</h3>
                <p>Lo mejor en Ficción aquí</p>
                <button className="buttonLight" onClick={() => handleNavigate('Ficcion')}>¡VAMOS!</button>
            </div>
            <div>
                <div className='background-image'></div>
                <div className='image-content'>
                    <div><img src={Ficcion1} alt="" /></div>
                    <div><img src={Ficcion2} alt="" /></div>
                    <div><img src={Ficcion3} alt="" /></div>
                </div>
            </div>
        </div>
    
        <div className='categories-content'>
            <div>
                <h3 className='title'>FANTASÍA</h3>
                <p>Lo mejor en Fantasía aquí</p>
                <button className="buttonLight" onClick={() => handleNavigate('Fantasia')}>¡VAMOS!</button>
            </div>
            <div>
                <div className='background-image'></div>
                <div className='image-content'>
                    <div><img src={Fantasia1} alt="" /></div>
                    <div><img src={Fantasia2} alt="" /></div>
                    <div><img src={Fantasia3} alt="" /></div>
                </div>
            </div>
        </div>
    
        <div className='categories-content'>
            <div>
                <h3 className='title'>COMEDIA</h3>
                <p>Lo mejor en Comedia aquí</p>
                <button className="buttonLight" onClick={() => handleNavigate('Comedia')}>¡VAMOS!</button>
            </div>
            <div>
                <div className='background-image'></div>
                <div className='image-content'>
                    <div><img src={Comedia1} alt="" /></div>
                    <div><img src={Comedia2} alt="" /></div>
                    <div><img src={Comedia3} alt="" /></div>
                </div>
            </div>
        </div>
            
        <div className='categories-content'>
            <div>
                <h3 className='title'>AVENTURA</h3>
                <p>Lo mejor en Aventura aquí</p>
                <button className="buttonLight" onClick={() => handleNavigate('Aventura')}>¡VAMOS!</button>
            </div>
            <div>
                <div className='background-image'></div>
                <div className='image-content'>
                    <div><img src={Aventura1} alt="" /></div>
                    <div><img src={Aventura2} alt="" /></div>
                    <div><img src={Aventura3} alt="" /></div>
                </div>
            </div>
        </div>
    
        <div className='categories-content'>
            <div>
                <h3 className='title'>MISTERIO</h3>
                <p>Lo mejor en Misterio aquí</p>
                <button className="buttonLight" onClick={() => handleNavigate('Misterio')}>¡VAMOS!</button>
            </div>
            <div>
                <div className='background-image'></div>
                <div className='image-content'>
                    <div><img src={Misterio1} alt="" /></div>
                    <div><img src={Misterio2} alt="" /></div>
                    <div><img src={Misterio3} alt="" /></div>
                </div>
            </div>
        </div>
    
        <div className='categories-content'>
            <div>
                <h3 className='title'>DRAMA</h3>
                <p>Lo mejor en Drama aquí</p>
                <button className="buttonLight" onClick={() => handleNavigate('Drama')}>¡VAMOS!</button>
            </div>
            <div>
                <div className='background-image'></div>
                <div className='image-content'>
                    <div><img src={Drama1} alt="" /></div>
                    <div><img src={Drama2} alt="" /></div>
                    <div><img src={Drama3} alt="" /></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CategoriesAll
