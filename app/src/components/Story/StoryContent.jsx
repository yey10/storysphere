import React from "react";
import "../../assets/css/storypage.css";

const StoryContent = ({ story }) => {
  return (
    <div className="read-content">
      <h2 className="title">Capítulo: "Nombre del capítulo"</h2>
      <div className="canvas">
        <p>{story.content}</p>
      </div>
    </div>
  );
};

export default StoryContent;
