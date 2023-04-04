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
    masterBPM,
  } = useContext(LooperContext);

  const loopTimeoutRef = useRef(null);
  const [lastArray, setLastArray] = useState([]);
  const howlsToPlayRef = useRef([]);
  const howlsPlayingRef = useRef([]);
  const newHowlRef = useRef();
  const [isMainPlaying, setIsMainPlaying] = useState(true);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    let localHowlsToPlay = [...howlsToPlayRef.current];
    if (
      howlsPlayingRef.current.length > 0 &&
      howlsToPlayRef.current.length === 0
    ) {
      howlsToPlayRef.current = [...arrayOfHowls];
    }

    if (newHowlRef.current) {
      const newHowlCopy = new Howl({
        src: newHowlRef.current._src,
        sprite: newHowlRef.current._sprite,
      });
      newHowlCopy._sprite.trimmed = [
        preRoll + masterPositionStep * (60000 / masterBPM),
        preRoll + masterLengthInMS + postRoll,
      ];
      console.log("new howl added", newHowlCopy._sprite.trimmed);
      console.log(newHowlCopy.play("trimmed"));
      newHowlCopy.play("trimmed");

      newHowlCopy.fade(0, 1, preRoll, newHowlCopy._sounds[0]._id);
      setTimeout(() => {
        newHowlCopy.fade(1, 0, postRoll, newHowlCopy._sounds[0]._id);
      }, masterLengthInMS + preRoll + (masterLengthInSteps - masterPositionStep) * (60000 / masterBPM));

      newHowlRef.current = null;
    }

    if (
      isPlaying &&
      masterPositionStep === masterLengthInSteps - 2 &&
      howlsToPlayRef.current.length > 0
    ) {
      setTimeout(() => {
        howlsToPlayRef.current.forEach((howl) => {
          howl.howl.play();
          howl.howl.fade(0, 1, preRoll, howl.howl._sounds[0]._id);
          setTimeout(() => {
            howl.howl.fade(1, 0, postRoll, howl.howl._sounds[0]._id);
            
            howl.hasPlayed = true;
          }, preRoll + masterLengthInMS);
          setTimeout(() => {
            howl.howl.fade(0,1,preRoll,howl.howl._sounds[0]._id);
          }, preRoll + masterLengthInMS + postRoll);
        });
      }, (masterLengthInSteps - masterPositionStep) * (60000 / masterBPM));

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
  useEffect(() => {
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

  return null;
};

export default TrackPlayer;
