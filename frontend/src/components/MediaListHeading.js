import React from "react";

/* This Component is re-used to render the Favourites heading */
const MediaListHeading = (props) => {
  return (
    <div className="col">
      <h1>{props.heading}</h1>
    </div>
  );
};

export default MediaListHeading;
