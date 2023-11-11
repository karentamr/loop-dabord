import  { useContext, useEffect } from "react";
import { LooperContext } from "../context/LooperContextProvider";

const Metronome = () => {
  const { masterPositionStep, isPlaying, isMetronomeOn,tick1,tick2 } = useContext(LooperContext);

 

  useEffect(() => {

    console.log("masterPositionBeat", masterPositionStep);
    if (isPlaying) {
      if(!isMetronomeOn) return;
      if (masterPositionStep % 4 === 0) {
        tick1.volume(0.5);
        tick1.play();
      } else {
        tick2.volume(1);
        tick2.play();
      }
    }
  }, [masterPositionStep, isPlaying]);

  return null;
};

export default Metronome;
