import React from 'react'

const PopularData = ({ ranks }) => {
  return (
    <div className="popular-data">
        {ranks.map((rank) => (
            <div key={rank.id} className='popular-storie'>
                <div><img src={rank.image} alt={rank.title} /></div>
                <div>
                    <div><p>RANK #{rank.rank}</p></div>
                    <span className='title'>{rank.title}</span>
                    <p>By {rank.author}</p>
                    <p>{rank.sinopsis}</p>
                </div>
            </div>
        ))}
        
    </div>
  )
}

export default PopularData
