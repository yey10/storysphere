import React from 'react'
import '../assets/css/loader.css'

const Loader = () => {
  return (
    <div className='LoaderContainer'>

        <div className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
        <div>
            <p>Cargando...</p>
        </div>

    </div>
  )
}

export default Loader
