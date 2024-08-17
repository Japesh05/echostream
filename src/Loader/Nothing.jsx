import React, { useState, useEffect } from "react";
import "./Spinner.css";
import Lottie from "react-lottie-player";
import lottieJson from "./nothing.json";
function Nothing() {

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Lottie
        animationData={lottieJson}
        play
        style={{ width: 350, height: 350 }}
      />
      <p className=" text-Xicon text-xl">Nothing Here to show!</p>
    </div>
  );
}

export default Nothing;
