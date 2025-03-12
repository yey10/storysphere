import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import autorImg from '../../assets/img/autor.jpg';
import { Heart, MessageSquareMore, Bookmark, Download } from "lucide-react";

const StoryHeader = ({ story, likes, handleLike, isLiking, userRatings, ratings, id, handleRateStory }) => {
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
                value={userRatings[id] || ratings[id] || 0}
                onChange={(newRating) => handleRateStory(id, newRating)}
                size={24}
                activeColor="#ffd700"
                isHalf={true}
              />
            </div>
            <p>{ratings[id] !== undefined ? ratings[id].toFixed(1) : "0.0"} puntuación</p>
            <button>
              <Link to="authors">Ver más</Link>
            </button>
          </div>
          <div className="info-story">
            <div>
              <div className="buttom buttonLike">
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                >
                  <Heart fill={likes[id] ? "red" : "none"} />
                  <p>{likes[id] || 0}</p>
                </button>
              </div>
              <div className="buttom buttonComms">
                <button>
                  <MessageSquareMore />
                  <p>0</p>
                </button>
              </div>
              <div className="buttom buttonFav">
                <button>
                  <Bookmark />
                  <p>0</p>
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