import React from "react";
import { ChevronsLeft, ChevronsRight, List } from "lucide-react";

const StoryChapters = () => {
  return (
    <div className="chapters">
      <div>
        <ChevronsLeft />
      </div>
      <div>
        <List />
        <p>Capítulos</p>
      </div>
      <div>
        <ChevronsRight />
      </div>
    </div>
  );
};

export default StoryChapters;