import React from 'react'

const PopularData = ({ ranks }) => {
  return (
    <div className="popular-data">
        {ranks.map((rank) => (
            <div key={rank.id} className='popular-storie'>
                <div><p>RANK #{rank.rank}</p></div>
                <div><img src={rank.image} alt={rank.title} /></div>
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
