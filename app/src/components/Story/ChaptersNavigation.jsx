import React from "react";
import { ChevronsLeft, ChevronsRight, List } from "lucide-react";
import "../../assets/css/storypage.css";

const ChaptersNavigation = () => {
  return (
    <div className="chapters">
      <div><ChevronsLeft /></div>
      <div><List /><p>Capítulos</p></div>
      <div><ChevronsRight /></div>
    </div>
  );
};

export default ChaptersNavigation;
