import React from "react";
import ReactStars from "react-rating-stars-component";

const StoryRating = ({ userRatings, ratings, id, handleRateStory }) => {

  const userRating = userRatings[id] ? Number(userRatings[id]) : 0;
  const averageRating = ratings[id]?.data ? Number(ratings[id].data) : 0;
  const starsValue = userRating || averageRating;

  console.log("ratings:", ratings);
  console.log("ratings[id]:", ratings[id], "Tipo:", typeof ratings[id]);

  return (
    <div className="punctuation">
      <h3 className="title">¿Te gusto lo que acabas de leer? Puedes puntuar la historia</h3>
      <div>
        <ReactStars
          count={5}
          value={starsValue}
          onChange={(newRating) => handleRateStory(id, newRating)}
          size={24}
          activeColor="#ffd700"
          isHalf={true}
        />
      </div>
      
      <p>{averageRating.toFixed(1)} puntuación</p>
    </div>
  );
};

export default StoryRating;