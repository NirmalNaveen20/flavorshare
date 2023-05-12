import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StoryViewer from "../../Components/Story/StoryViewer/StoryViewer";
import { findStoryByUserId } from "../../Redux/Story/Action";

import { story } from "./StoryData";

const Story = () => {
  const {story}=useSelector(store=>store);
const dispatch=useDispatch()
  const jwt = localStorage.getItem("token");
  const { userId } = useParams();
// console.log(story?.stories,"-------")
  useEffect(() => {
    const data = { jwt, userId };
    dispatch(findStoryByUserId(data));
  }, [userId]);

  return (
    <div>
      {story.stories?.length>0 && <StoryViewer stories={story.stories} />}
      {/* <StoryViewer stories={story} />
     <StoryViewer stories={story} />
     <StoryViewer stories={story} />
     <StoryViewer stories={story} /> */}
    </div>
  );
};

export default Story;
