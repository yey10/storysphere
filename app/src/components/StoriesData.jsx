import React, { useState } from 'react';
import Modal from './Modal';

const StoriesData = ({ stories }) => {
    const [selectedStory, setSelectedStory] = useState(null);

    return (
        <div>
            <div className="body4-content">
                {stories.map((story) => (
                    <div key={story.id} className="story">
                        <div>
                            <img src={story.image} alt={story.title} />
                        </div>
                        <div className="story-info">
                            <h2 className='title'>{story.title}</h2>
                            <p>{story.author}</p>
                            <p>{story.sinopsis}</p>
                            <button className='buttonLight' onClick={() => setSelectedStory(story)}>Leer Historia</button>
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
