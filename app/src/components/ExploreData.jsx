import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Placeholder from '../assets/img/logo.jpeg';

const ExploreData = ({ stories }) => {
  return (
    <div className='explore-data'>
        {stories.map((story) => (
            <div key={story.id} className="story">
                <div>
                    <LazyLoadImage src={story.image} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
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
