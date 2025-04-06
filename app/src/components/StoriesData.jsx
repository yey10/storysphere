import React, { useState } from 'react';
import Modal from './Modal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Placeholder from '../assets/img/logo.jpeg';

const StoriesData = ({ stories }) => {
    const [selectedStory, setSelectedStory] = useState(null);

    return (
        <div>
            <div className="body4-content">
                {stories.map((story) => (
                    <div key={story.id_story} className="story">
                        <div>
                            <LazyLoadImage src={story.photo} placeholderSrc={Placeholder} effect='blur' wrapperClassName='placeholder-img' />
                        </div>
                        <div className="story-info">
                            <h2 className='title'>{story.title}</h2>
                            <p>By {story.author}</p>
                            <div><p>{story.sinopsis}</p></div>
                            <button className="buttonLight" onClick={() => setSelectedStory(story)}>
                                Leer Historia
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Renderizar el modal solo si hay una historia seleccionada */}
            {selectedStory && (
                <Modal isOpen={!!selectedStory} onClose={() => setSelectedStory(null)} story={selectedStory} />
            )}
        </div>
    );
};

export default StoriesData;
