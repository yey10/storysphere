import React from 'react'

const ExploreData = ({ stories }) => {
  return (
    <div className='explore-data'>
        {stories.map((story) => (
            <div key={story.id} className="story">
                <div>
                    <img src={story.image} alt={story.title} />
                </div>
                <div className="story-info">
                    <h2 className='title'>{story.title}</h2>
                    <p>{story.author}</p>
                    <div><p>{story.sinopsis}</p></div>
                    <button className="buttonLight">Leer Historia</button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ExploreData
