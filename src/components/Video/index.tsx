import React, { useEffect, useRef } from "react";

function Video() {
  const vidRef = useRef<HTMLVideoElement>(null);
  const windowWidth = window.innerWidth * 0.5;
  const windowHeight = window.innerHeight * 0.5;
  const rules = {
    audio: false,
    video: { facingMode: "environment" },
  };
  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      // check if the browser is getting a prompt for cam permission
      const loadCam = navigator.mediaDevices
        .getUserMedia(rules) // returns promise, ask for cam permission with constraints in rules above
        .then((stream) => {
          if (vidRef.current === null) return;
          vidRef.current.srcObject = stream;
          return new Promise(
            (resolve) =>
              vidRef.current && (vidRef.current.onloadedmetadata = resolve)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("No camera detected");
    }
  }, [rules]);

  // ...
  // The rest of your component code, where the vidRef is defined and used

  return (
    <video
      ref={vidRef}
      autoPlay
      playsInline
      muted
      width={windowWidth}
      height={windowHeight}
    ></video>
  );
}

export default Video;
