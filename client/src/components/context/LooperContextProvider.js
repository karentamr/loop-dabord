import React, { createContext, useState, useEffect, useRef } from "react";
import { Howl } from "howler";
export const LooperContext = createContext();

export const LooperContextProvider = ({ children }) => {
  const [masterBPM, setMasterBPM] = useState(120);
  const [masterLengthInSteps, setMasterLengthInSteps] = useState(8);
  const [preRoll, setPreRoll] = useState(200); // in ms
  const [postRoll, setPostRoll] = useState(200); // in ms
  const [isPlaying, setIsPlaying] = useState(false);
  const [arrayOf64Audio, setArrayOf64Audio] = useState([]);
  const [arrayOfHowls, setArrayOfHowls] = useState([]);
  const [arrayOfBlobURLs, setArrayOfBlobURLs] = useState([]);
  const [masterPositionInMS, setMasterPositionInMS] = useState(0);
  const [masterPositionStep, setMasterPositionStep] = useState(0);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null);
  const [isMetronomeOn, setIsMetronomeOn] = useState(true);
  const [masterVolume, setMasterVolume] = useState(1);

  const [masterLengthInMS, setMasterLengthInMS] = useState(
    (60 / masterBPM) * masterLengthInSteps * 1000
  );

const masterTogglePlay = useRef(null);

const tick1 = new Howl({
  src: ["/audio/druminfected__metronome.mp3"],
});

const tick2 = new Howl({
  src: ["/audio/druminfected__metronome_pitchedDown.mp3"],
});

useEffect(() => {
  setMasterLengthInMS((60 / masterBPM) * masterLengthInSteps * 1000);
  setMasterPositionStep(masterLengthInSteps - 4);
}, [masterBPM, masterLengthInSteps]);


//function to push blobs to the array
const addToHowlArray = (howl) => {
  setArrayOfHowls([...arrayOfHowls, {howl, id: howl._src, isFirstPlayback: true}]);
  console.log("howl added");
};

const addToBlobURLArray = (blobURL) => {
  setArrayOfBlobURLs([...arrayOfBlobURLs, blobURL]);
  console.log("blobURL added");
};

const addTo64Array = (chunk) => {
  setArrayOf64Audio([...arrayOf64Audio, chunk]);
};

const clearEverything = () => {
  setIsPlaying(false);
  setArrayOfHowls([]);
  setArrayOfBlobURLs([]);
  setArrayOf64Audio([]);
  setMasterPositionStep(0);
  setMasterPositionInMS(0);
  
  console.log("cleared");
};

  
  return (
    <LooperContext.Provider
      value={{

        masterBPM,
        setMasterBPM,
        masterLengthInSteps,
        setMasterLengthInSteps,
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
        arrayOfHowls,
        setArrayOfHowls,
        arrayOfBlobURLs,
        setArrayOfBlobURLs,
        addToBlobURLArray,
        masterVolume,
        setMasterVolume,
        selectedAudioDevice,
        setSelectedAudioDevice,
        clearEverything,
        arrayOf64Audio,
        setArrayOf64Audio,
        addTo64Array,
        isMetronomeOn,
        setIsMetronomeOn,
        tick1,
        tick2,

        }}
    >
      
      {children}
    </LooperContext.Provider>
  );
};

export default LooperContextProvider;
