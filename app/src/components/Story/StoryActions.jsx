import React from "react";
import { Heart, MessageSquareMore, Bookmark, Download } from "lucide-react";
import "../../assets/css/storypage.css";

const StoryActions = ({ handleLike, isLiking, likes, id }) => {
  return (
    <div className="info-story">
      <h1>Detalles de la Historia</h1>
      <button 
        onClick={handleLike} 
        disabled={isLiking}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
      >
        <Heart fill={likes[id] ? "red" : "none"} color="black" />
        <span>{likes[id] || 0}</span>
      </button>
      <div><MessageSquareMore /><p>0</p></div>
      <div><Bookmark /><p>0</p></div>
      <div><Download /><p>0</p></div>
    </div>
  );
};

export default StoryActions;
