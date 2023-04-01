import React, { useState, useEffect, useContext, useRef } from "react";
import { LooperContext } from "../context/LooperContextProvider";

import { Howl } from "howler";

const TrackPlayer = () => {
  const {
    ctx,
    arrayOfBlobs,
    isPlaying,
    setIsPlaying,
    masterLengthInMS,
    arrayOfHowls,
  } = useContext(LooperContext);
  const loopTimeoutRef = useRef(null);





  const playLoop = () => {
    console.log("play loop");
    console.log("arrayOfHowls", arrayOfHowls);

    if(loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);

    if(arrayOfHowls.length>0){
    arrayOfHowls.forEach((howl) => {
      console.log("howl", howl);
      howl.howl.play();
    });
  }
    loopTimeoutRef.current = setTimeout(playLoop, masterLengthInMS);
  };


  useEffect(() => {
    if (isPlaying) {
      playLoop();
    } else {
      if(loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    }
  }, [isPlaying, arrayOfHowls]);



 
  return null;
};

export default TrackPlayer;
