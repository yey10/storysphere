import { useState } from 'react'
import { Heart, Bookmark } from 'lucide-react';

const FavoriteData = ({ historiasMeGusta, historiasFavoritas }) => {
    const [vista, setVista] = useState("meGusta");
  return (
    <div className="contenedor">
      <div className="botones">
        <button
          className={vista === "meGusta" ? "boton activo" : "boton"}
          onClick={() => setVista("meGusta")}
        >
          <Heart /> <p>Me Gusta</p>
        </button>
        <button
          className={vista === "favoritos" ? "boton activo" : "boton"}
          onClick={() => setVista("favoritos")}
        >
          <Bookmark /> <p>Favoritos</p>
        </button>
      </div>

      <div className="lista">
        {vista === "meGusta"
          ? historiasMeGusta.map((historia) => (
              <div key={historia.id} className="item">
                <div className="like-image">
                    <div><Heart fill='red' /></div>
                    <img src={historia.image} alt={historia.title} />
                </div>
                <div className="like-info">
                    <h2 className='title'>{historia.title}</h2>
                    <p>{historia.author}</p>
                    <p>{historia.description}</p>
                    <button className='buttonLight'>Leer Historia</button>
                </div>
              </div>
            ))
          : historiasFavoritas.map((historia) => (
            <div key={historia.id} className="item">
                <div className="like-image">
                    <div><Bookmark fill='yellow' /></div>
                    <img src={historia.image} alt={historia.title} />
                </div>
                <div className="like-info">
                    <h2 className='title'>{historia.title}</h2>
                    <p>{historia.author}</p>
                    <p>{historia.description}</p>
                    <button className='buttonLight'>Leer Historia</button>
                </div>
            </div>
            ))}
      </div>
    </div>
  )
}

export default FavoriteData
