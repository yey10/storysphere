import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import autorImg from "../../assets/img/autor.jpg";
import "../../assets/css/storypage.css";

const StoryDetails = ({ story, ratings, userRatings, handleRateStory, id }) => {
  return (
    <div className="info-autor">
      <div><img src={autorImg} alt="" /></div>
      <p>By {story.author}</p>
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
      <button><Link to="authors">Ver más</Link></button>
    </div>
  );
};

export default StoryDetails;
