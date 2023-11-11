import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { LooperContext } from "../context/LooperContextProvider";
import { Howl, Howler } from "howler";
import VolumeSlider from "./VolumeSlider";
import { FaPlay, FaPause } from "react-icons/fa";

const TrackPlayer = () => {
  const {
    isPlaying,
    setIsPlaying,
    masterLengthInMS,
    preRoll,
    postRoll,
    arrayOfHowls,
    masterPositionStep,
    setMasterPositionStep,
    masterLengthInSteps,
    masterBPM,
    masterVolume,
  } = useContext(LooperContext);

  const [lastArray, setLastArray] = useState([]);
  const howlsToPlayRef = useRef([]);
  const howlsPlayingRef = useRef([]);
  const newHowlRef = useRef();
  const [lastVolume, setLastVolume] = useState(masterVolume);

  // Effect to handle howl playback
  useEffect(() => {
    if (!isPlaying) {
      howlsToPlayRef.current.forEach((howl) => {
        howl.howl.stop();
      });
    }

    // Manage howls playing and to be played

    if (
      howlsPlayingRef.current.length > 0 &&
      howlsToPlayRef.current.length === 0
    ) {
      howlsToPlayRef.current = [...arrayOfHowls];
    }

    // Playing new howl if it's added
    if (newHowlRef.current && isPlaying) {
      // Create a new Howl instance
      const newHowlCopy = new Howl({
        src: newHowlRef.current._src,
        sprite: newHowlRef.current._sprite,
      });
      // Set timing for the howl
      newHowlCopy._sprite.trimmed = [
        masterPositionStep * (60000 / masterBPM) + preRoll + 200,
        preRoll + masterLengthInMS + postRoll,
      ];
      console.log("new howl added", newHowlCopy._sprite.trimmed);
      console.log(newHowlCopy.play("trimmed"));

      // Play and manage fade of the howl
      newHowlCopy.play("trimmed");

      newHowlCopy.fade(
        0,
        1,
        preRoll + masterLengthInMS,
        newHowlCopy._sounds[0]._id
      );
      setTimeout(() => {
        newHowlCopy.fade(1, 0, postRoll, newHowlCopy._sounds[0]._id);
      }, preRoll + masterLengthInMS);

      newHowlRef.current = null;
    }
    // Scheduling howls to play at the end of the loop
    if (
      isPlaying &&
      masterPositionStep === masterLengthInSteps - 1 &&
      howlsToPlayRef.current.length > 0
    ) {
      setTimeout(() => {
        howlsToPlayRef.current.forEach((howl) => {
          console.log("YOYOYOYO" + howl);

          howl.howl.play();
          setTimeout(() => {
            howl.howl.fade(1, 0, postRoll, howl.howl._sounds[0]._id);
            howl.hasPlayed = true;
          }, preRoll + masterLengthInMS + postRoll);
          setTimeout(() => {
            howl.howl.fade(0, 1, postRoll, howl.howl._sounds[0]._id);
          }, preRoll + masterLengthInMS + postRoll + 100);
        });

        return;
      }, 60000 / masterBPM - preRoll - 200);

      howlsPlayingRef.current = [...howlsToPlayRef.current];
    }
  }, [isPlaying, masterPositionStep]);

  // find new howl when arrayOfHowls changes
  const findNewHowl = (arrayOfHowls, lastArray) => {
    let newHowl = arrayOfHowls.filter((howl) => {
      return !lastArray.includes(howl);
    });

    return newHowl;
  };

  // Effect to find new howl when arrayOfHowls changes
  useEffect(() => {
    console.log("array of howls changed", arrayOfHowls);
    console.log("last array", lastArray);
    console.log(howlsToPlayRef.current);
    if (arrayOfHowls.length === 0) {
      howlsToPlayRef.current = [];
    }
    // sets the array of howls to play  for the main loop
    if (arrayOfHowls.length > 0) {
      howlsToPlayRef.current = [...arrayOfHowls];
    }

    // if new howl is added, get it ready to play instantly
    if (arrayOfHowls.length > lastArray.length) {
      newHowlRef.current = findNewHowl(arrayOfHowls, lastArray)[0].howl;

      setLastArray(arrayOfHowls);
    }
  }, [arrayOfHowls]);

  // Effect to handle global volume change
  useEffect(() => {
    Howler.volume(masterVolume);
    setLastVolume(masterVolume);
  }, [masterVolume]);

  // Play/Pause toggle
  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      Howler.volume(0);
      setMasterPositionStep(masterLengthInSteps - 4);
    } else {
      setIsPlaying(true);
      Howler.volume(lastVolume);
    }
  };

  return (
    <Wrapper>
      <PlayPauseButton onClick={handlePlayPause}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </PlayPauseButton>
      <VolumeSlider />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const PlayIcon = styled(FaPlay)`
  margin-right: 10px;
`;

const PauseIcon = styled(FaPause)`
  margin-right: 10px;
`;

const PlayPauseButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 120px;
    height: 120px;
    fill: var(--primary-color);
    transition: all 0.2s ease-in-out;
  }

  &:hover svg {
    fill: var(--secondary-color);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export default TrackPlayer;
