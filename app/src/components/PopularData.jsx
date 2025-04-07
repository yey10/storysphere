import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Placeholder from '../assets/img/logo.jpeg';

const PopularData = ({ ranks }) => {
  return (
    <div className="popular-data">
        {ranks.map((rank) => (
            <div key={rank.id} className='popular-storie'>
                <div><p>RANK #{rank.rank}</p></div>
                <div><LazyLoadImage src={rank.image} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' /></div>
                <div>
                    <div><p>RANK #{rank.rank}</p></div>
                    <h4 className='title'>{rank.title}</h4>
                    <p>By {rank.author}</p>
                    <p>{rank.sinopsis}</p>
                    <button className='buttonLight'>Ver info</button>
                </div>
            </div>
        ))}
        
    </div>
  )
}

export default PopularData
