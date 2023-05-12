import React, { useState, useEffect } from "react";
import "./StoryProgress.css";

const StoryProgressBar = ({ duration, index, activeIndex, setActiveIndex }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        }

        clearInterval(interval);
        return prevProgress;
      });
    }, duration / 100);

    return () => {
      clearInterval(interval);
    };
  }, [duration, activeIndex]);

  useEffect(() => {
    setProgress(0);
  }, [activeIndex]);

  const isActive = index === activeIndex;

  return (
    <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
      <div
        className={`${isActive ? "progress-bar" : ""}`}
        style={{ width: ` ${progress}%` }}
      ></div>
    </div>
  );
};

export default StoryProgressBar;
