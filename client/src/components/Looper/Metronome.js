import React, { useContext, useEffect, useRef } from "react";
import { LooperContext } from "../context/LooperContextProvider";
import { Howl } from "howler";

const Metronome = () => {
  const { masterPositionStep, isPlaying, isMetronomeOn,tick1,tick2 } = useContext(LooperContext);

 

  useEffect(() => {

    console.log("masterPositionBeat", masterPositionStep);
    if (isPlaying) {
      if(!isMetronomeOn) return;
      if (masterPositionStep % 4 === 0) {
        tick1.volume(0.3);
        tick1.play();
      } else {
        tick2.volume(0.8);
        tick2.play();
      }
    }
  }, [masterPositionStep, isPlaying]);

  return null;
};

export default Metronome;