//@ts-nocheck
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "../utils/utilities";

function App() {
  const [tab, setTab] = useState("detect");
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="absolute top-[5rem] flex justify-center gap-[2rem]">
        <button
          className="rounded-md bg-white p-5 text-black hover:brightness-75"
          onClick={() => setTab("detect")}
        >
          Detect
        </button>
        <button
          className="rounded-md bg-white p-5 text-black hover:brightness-75"
          onClick={() => setTab("results")}
        >
          Results
        </button>
      </div>
      <header>
        {tab === "detect" ? (
          <>
            <Webcam
              ref={webcamRef}
              muted={true}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                top: "15rem",
                textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480,
              }}
            />

            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                top: "15rem",
                textAlign: "center",
                zindex: 8,
                width: 640,
                height: 480,
              }}
            />
          </>
        ) : (
          <div className="mt-20 h-[500px] w-[500px] rounded-md bg-white shadow-md">
            results
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
