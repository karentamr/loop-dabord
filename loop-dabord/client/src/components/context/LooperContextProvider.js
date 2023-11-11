import React, { createContext, useState, useEffect, useRef } from "react";
import { Howl } from "howler";
export const LooperContext = createContext();

export const LooperContextProvider = ({ children }) => {
  // State definitions
  const [masterBPM, setMasterBPM] = useState(120);
  const [masterLengthInSteps, setMasterLengthInSteps] = useState(8);
  const [preRoll ] = useState(200); // Pre-roll time in milliseconds
  const [postRoll] = useState(200); // Post-roll time in milliseconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [arrayOf64Audio, setArrayOf64Audio] = useState([]); // Array to store audio data in base64 format
  const [arrayOfHowls, setArrayOfHowls] = useState([]); // Array of Howl objects for audio playback
  const [arrayOfBlobURLs, setArrayOfBlobURLs] = useState([]); // Array of Blob URLs for audio data
  const [masterPositionInMS, setMasterPositionInMS] = useState(0); // Master position in milliseconds
  const [masterPositionStep, setMasterPositionStep] = useState(0); // Master position in steps
  const [selectedAudioDevice, setSelectedAudioDevice] = useState(null); // Currently selected audio device
  const [isMetronomeOn, setIsMetronomeOn] = useState(true); // Metronome state
  const [masterVolume, setMasterVolume] = useState(1); // Master volume
  const [trackVolumes, setTrackVolumes] = useState([0.5]); // Individual track volumes
  const [masterLengthInMS, setMasterLengthInMS] = useState(
    (60 / masterBPM) * masterLengthInSteps * 1000
  ); // Calculate master loop length in milliseconds

  // Refs for controlling play toggles
  const masterTogglePlay = useRef(null);

  // Metronome sound tick definitions
  const tick1 = new Howl({ src: ["/audio/druminfected__metronome.mp3"] });
  const tick2 = new Howl({
    src: ["/audio/druminfected__metronome_pitchedDown.mp3"],
  });

  // Effect to update master loop length when BPM or step changes
  useEffect(() => {
    setMasterLengthInMS((60 / masterBPM) * masterLengthInSteps * 1000);
    setMasterPositionStep(masterLengthInSteps - 4);
  }, [masterBPM, masterLengthInSteps]);

  // Function to add new Howl objects to the array for playback
  const addToHowlArray = (howl) => {
    setArrayOfHowls([
      ...arrayOfHowls,
      { howl, id: howl._src, isFirstPlayback: true },
    ]);
  };

  // Function to add Blob URLs to the array
  const addToBlobURLArray = (blobURL) => {
    setArrayOfBlobURLs([...arrayOfBlobURLs, blobURL]);
    console.log("blobURL added");
  };

  // Function to add base64 audio chunks to the array
  const addTo64Array = (chunk) => {
    setArrayOf64Audio([...arrayOf64Audio, chunk]);
  };

  // Function to clear all loop data and reset states
  const clearEverything = () => {
    setIsPlaying(false);
    setArrayOfHowls([]);
    setArrayOfBlobURLs([]);
    setArrayOf64Audio([]);
    setMasterPositionStep(0);
    setMasterPositionInMS(0);
    console.log("cleared");
  };

  // Function to delete a specific loop from all arrays
  const deleteLoopFromAllArrays = (index) => {
    let newHowls = arrayOfHowls.filter((howl, i) => i !== index);
    let newBlobs = arrayOfBlobURLs.filter((blob, i) => i !== index);
    let new64 = arrayOf64Audio.filter((chunk, i) => i !== index);
    setArrayOfHowls(newHowls);
    setArrayOfBlobURLs(newBlobs);
    setArrayOf64Audio(new64);
  };

  // Function to handle volume change for a specific track
  const handleTrackVolumeChange = (trackIndex, volume) => {
    let newTrackVolumes = [...trackVolumes];
    newTrackVolumes[trackIndex] = volume;
    setTrackVolumes(newTrackVolumes);
    arrayOfHowls[trackIndex].howl.volume(volume);
  };

  // Context provider
  return (
    <LooperContext.Provider
      value={{
        // All context values and setters are provided here
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
        deleteLoopFromAllArrays,
        trackVolumes,
        handleTrackVolumeChange,
      }}
    >
      {children}
    </LooperContext.Provider>
  );
};

export default LooperContextProvider;
