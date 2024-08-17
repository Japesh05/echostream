import React, { useState, useEffect } from "react";
import "./Spinner.css";
import Lottie from "react-lottie-player";
import lottieJson from "./Loading.json";
function Upload() {

  return (
    <div className="overlay">
      <Lottie
        animationData={lottieJson}
        play
        style={{ width: 250, height: 250 }}
      />
    </div>
  );
}

export default Upload;
