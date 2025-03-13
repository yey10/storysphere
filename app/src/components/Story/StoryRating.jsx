import React from "react";
import ReactStars from "react-rating-stars-component";

const StoryRating = ({ userRatings, ratings, id, handleRateStory }) => {
      console.log("ratings:", ratings);
      console.log("ratings[id]:", ratings[id], "Tipo:", typeof ratings[id]);
  return (
    <div className="punctuation">
      <h3 className="title">¿Te gusto lo que acabas de leer? Puedes puntuar la historia</h3>
      <div>
        <ReactStars
          count={5}
          value={Number(userRatings[id]) || Number(ratings[id]) || 0}
          onChange={(newRating) => handleRateStory(id, newRating)}
          size={24}
          activeColor="#ffd700"
          isHalf={true}
        />
      </div>
      
      <p>{ratings[id] && ratings[id].data !== undefined ? Number(ratings[id].data).toFixed(1) : "0.0"} puntuación</p>
    </div>
  );
};

export default StoryRating;