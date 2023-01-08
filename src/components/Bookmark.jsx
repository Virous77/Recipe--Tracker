import React from "react";

const Bookmark = ({ setShowBookmark }) => {
  return (
    <div className="bookmark" onClick={() => setShowBookmark(true)}>
      Bookmark
    </div>
  );
};

export default Bookmark;
