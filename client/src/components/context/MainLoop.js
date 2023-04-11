import React from "react";
import styled from "styled-components";
import { useContext, useState,useEffect } from "react";
import { LooperContext } from "../context/LooperContextProvider";
import { Howl } from "howler";

const MainLoop = () => {
    const { ctx,
        masterBPM,
        masterLengthInSteps,
        masterLengthInMS,
        addToBufferArray,
        arrayOfBuffers,
        isPlaying,
        setIsPlaying,
        masterPositionInMS,
        setMasterPositionInMS,
        masterPositionStep,
        setMasterPositionStep,
        masterTogglePlay
    } = useContext(LooperContext);
    

    const [intervalId, setIntervalId] = useState(null);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    masterTogglePlay.current = togglePlay;

    const playTick = () => {
setMasterPositionStep((prevMasterPositionStep) => (prevMasterPositionStep + 1) % masterLengthInSteps);
      };
    
      useEffect(() => {
        let newIntervalId;
        if (isPlaying) {
          if (intervalId) clearInterval(intervalId);
    
          newIntervalId = setInterval(playTick, 60000 / masterBPM);
          setIntervalId(newIntervalId);
        } else {
          if (intervalId) clearInterval(intervalId);
          setIntervalId(null);
        }
    
        return () => {
          clearInterval(newIntervalId);
        };
      }, [isPlaying, masterBPM]);

      



    return 
}



export default MainLoop;