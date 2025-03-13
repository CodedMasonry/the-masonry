import React from "react";

const VideoPlayer = () => {
  return (
    <div className="flex items-center justify-center bg-black">
      <div className="w-[90vw] max-w-full">
        <video controls autoPlay className="block h-auto w-full">
          <source
            src="https://hz2lv8281m.ufs.sh/f/v97wqiBL7HaNhAbkzvybsTJlfXj6G4mdWqYHRkFzrS92Q8tL"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
