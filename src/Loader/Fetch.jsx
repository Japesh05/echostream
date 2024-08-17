import React, { useState, useEffect } from "react";
import "./Spinner.css";
import Lottie from "react-lottie-player";
import lottieJson from "./initialLoader.json";
function Fetch() {

  return (
    <div className="overlay">
      <Lottie
        animationData={lottieJson}
        play
        style={{ width: 350, height: 350 }}
      />
    </div>
  );
}

export default Fetch;
