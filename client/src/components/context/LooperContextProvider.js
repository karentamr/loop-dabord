import React, { createContext, useState, useEffect, useRef } from "react";
export const LooperContext = createContext();

export const LooperContextProvider = ({ children }) => {
  const [masterBPM, setMasterBPM] = useState(60);
  const [masterLengthInSteps, setMasterLengthInSteps] = useState(4);
  const [preRoll, setPreRoll] = useState(60000 / masterBPM); // in ms
  const [postRoll, setPostRoll] = useState(60000 / masterBPM); // in ms
  const [isPlaying, setIsPlaying] = useState(false);
  const [arrayOfHowls, setArrayOfHowls] = useState([]);
  const [masterPositionInMS, setMasterPositionInMS] = useState(0);
  const [masterPositionStep, setMasterPositionStep] = useState(0);

  const [masterLengthInMS, setMasterLengthInMS] = useState(
    (60 / masterBPM) * masterLengthInSteps * 1000
  );

  const masterTogglePlay = useRef(null);



//function to push blobs to the array
const addToHowlArray = (howl) => {
  setArrayOfHowls([...arrayOfHowls, {howl, id: howl._src, isFirstPlayback: true}]);
  console.log("howl added");
};





useEffect(() => {
  console.log("arrayOfHowls", arrayOfHowls);
}, [arrayOfHowls]);

  
  return (
    <LooperContext.Provider
      value={{

        masterBPM,
        masterLengthInSteps,
        masterLengthInMS,
        isPlaying,
        setIsPlaying,
        masterPositionInMS,
        setMasterPositionInMS,
        masterPositionStep,
        setMasterPositionStep,
        preRoll,
        postRoll,
        masterTogglePlay,
        addToHowlArray,
        arrayOfHowls
        }}
    >
      
      {children}
    </LooperContext.Provider>
  );
};

export default LooperContextProvider;
