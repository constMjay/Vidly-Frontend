import React from "react";

const Like = ({ liked, likeOnClick }) => {
  let reactClasses = "";
  liked === !true ? (reactClasses += "fas") : (reactClasses += "far");

  return (
    <button
      style={{ outline: "none" }}
      className="border-0 bg-transparent"
      onClick={likeOnClick}
    >
      <i className={reactClasses + " fa-heart "}></i>
    </button>
  );
};

export default Like;
