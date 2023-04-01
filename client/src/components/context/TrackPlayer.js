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
    preRoll,
    postRoll,
    arrayOfHowls,
    masterPositionStep,
    masterLengthInSteps,
  } = useContext(LooperContext);
  const loopTimeoutRef = useRef(null);

  const playLoop = () => {
    console.log("play loop");
    console.log("arrayOfHowls", arrayOfHowls);
    if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);

    if (arrayOfHowls.length > 0) {
      arrayOfHowls.forEach((howl) => {
        console.log("howl", howl);
        if (!howl.isFirstPlayback) {
          howl.howl._sprite.trimmed = [
            0,
            masterLengthInMS + preRoll + postRoll,
          ];
          howl.howl.play("trimmed");
        } else {
          howl.isFirstPlayback = false;
          howl.howl._sprite.trimmed = [preRoll, masterLengthInMS + postRoll];
          setTimeout(() => {
            howl.howl.play("trimmed");
          }, preRoll);
          // setTimeout to fade out after masterLengthInMs
          setTimeout(() => {

          }, masterLengthInMS - 1000);
        }
      });
    }
    loopTimeoutRef.current = setTimeout(playLoop, masterLengthInMS);
  };

  useEffect(() => {
    if (masterPositionStep === masterLengthInSteps - 1) {
      if (isPlaying) {
        playLoop();
      } else {
        if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
      }
    }
  }, [isPlaying, arrayOfHowls, masterPositionStep, masterLengthInSteps]);

  return null;
};

export default TrackPlayer;
