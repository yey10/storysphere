import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import autorImg from '../../assets/img/autor.jpg';
import { Heart, MessageSquareMore, Bookmark, Download } from "lucide-react";

const StoryHeader = ({ story, likes, favorites, handleLike, handleFavorite, userInteractions, userRatings, ratings, id, handleRateStory }) => {
  
  const userRating = userRatings[id] ? Number(userRatings[id]) : 0;
  const averageRating = ratings[id]?.data ? Number(ratings[id].data) : 0;
  const starsValue = userRating || averageRating;
  
  return (
    <div className="read-info">
      <div>
        <img src={story.photo || StoryImg} alt={story.title} />
      </div>
      <div>
        <h1 className="title">{story.title}</h1>
        <div className="info-content">
          <div className="info-autor">
            <div>
              <img src={autorImg} alt="" />
            </div>
            <p>By {story.author}</p>
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
            <button>
              <Link to="authors">Ver más</Link>
            </button>
          </div>
          <div className="info-story">
            <div>
              <div className="buttom buttonLike">
              <button onClick={handleLike} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                <Heart fill={userInteractions?.[id] === "like" || userInteractions?.[id] === "both" ? "red" : "none"}
                  color="red" />
                <p>{likes}</p>
              </button>
              </div>
              <div className="buttom buttonComms">
                <button>
                  <MessageSquareMore />
                  <p>0</p>
                </button>
              </div>
              <div className="buttom buttonFav">
              <button onClick={handleFavorite} className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
                <Bookmark fill={userInteractions?.[id] === "favorite" || userInteractions?.[id] === "both" ? "gold" : "none"}
                  color="gold" />
                <p>{favorites}</p>
              </button>
              </div>
              <div className="buttom buttonDown">
                <button>
                  <Download />
                  <p>0</p>
                </button>
              </div>
            </div>
            <div>
              <p>{story.sinopsis}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryHeader;