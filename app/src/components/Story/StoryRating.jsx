import React from "react";
import ReactStars from "react-rating-stars-component";
import "../../assets/css/storypage.css";

const StoryRating = ({ ratings, userRatings, handleRateStory, id }) => {
  return (
    <div className="punctuation">
      <h3 className="title">¿Te gustó lo que acabas de leer? Puedes puntuar la historia</h3>
      <div>
        <ReactStars
          count={5}
          value={userRatings[id] || ratings[id] || 0}
          onChange={(newRating) => handleRateStory(id, newRating)}
          size={24}
          activeColor="#ffd700"
          isHalf={true}
        />
      </div>
      <p>{ratings[id] !== undefined ? ratings[id].toFixed(1) : "0.0"} puntuación</p>
    </div>
  );
};

export default StoryRating;
