import React from "react";

const StoryContent = ({ story }) => {
  return (
    <div className="read-content">
      <h2 className="title">Capitulo: "Nombre del capitulo"</h2>
      <div className="canvas">
        <p>{story.content}</p>
      </div>
    </div>
  );
};

export default StoryContent;