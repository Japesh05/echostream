import React, { useState, useEffect } from "react";
import "./Spinner.css";
import Lottie from "react-lottie-player";
import lottieJson from "./success.json";
function Spinner() {

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

export default Spinner;
