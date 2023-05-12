import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findStoryByUserId } from "../../../Redux/Story/Action";

const StoryCircle = ({ image, username, userId }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`story/${userId}`);
  };

  
  return (
    <div className="cursor-pointer flex flex-col items-center" onClick={handleNavigate}>
      <img className="w-16 h-16 rounded-full" src={image} alt="" />
      <p>
        {username?.length > 9 ? username.substring(0, 9) + "..." : username}
      </p>
    </div>
  );
};

export default StoryCircle;
