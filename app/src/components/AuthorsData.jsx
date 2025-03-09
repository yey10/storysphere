import React from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

const AuthorsData = ({ authors }) => {
  return (
    <div className='authors-general'>
        
        {authors.map((author) => (
            <div key={author.id} className='author-box'>
                <div className='author-image'><img src={author.image} alt={author.name} /></div>
                <div className='author-info'>
                    <h3 className='title'>{author.name}</h3>
                    <div><Star /><Star /><Star /><Star /><Star /></div>
                    <p>{author.points}</p>
                    <button className='buttonLight'><Link to="/login">Ver Perfil</Link></button>
                </div>
            </div>
        ))}
        
    </div>
  )
}

export default AuthorsData
