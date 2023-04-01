import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { LooperContext } from "./LooperContextProvider";
import { Howl } from "howler";

const Recorder = () => {
  const {
    addToHowlArray,
    masterPositionStep,
    isPlaying,
    setIsPlaying,
    masterLengthInSteps,
    masterLengthInMS,
    togglePlay,
    preRoll,
    postRoll,

  } = useContext(LooperContext);

  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingEngaged, setIsRecordingEngaged] = useState(false);

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);


  const waitForDataAvailable = (mediaRecorder) =>
  new Promise((resolve) => {
    const onDataAvailable = (event) => {
      if (event.data.size > 0) {
        resolve(event);
      }
    };

    mediaRecorder.addEventListener("dataavailable", onDataAvailable);
  });

  const startRecording = async () => {
    setIsRecording(true);
    console.log("start recording");
    if (!isPlaying) togglePlay();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.start(100);
    console.log("mediaRecorderRef.current", mediaRecorderRef.current);

    const handleData = async () => {
    const event = await waitForDataAvailable(mediaRecorderRef.current);
    handleDataAvailable(event);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      setTimeout(handleData, 100); // Set the interval here
    }
  };

  handleData();
  };

  const stopRecording = async () => {
    console.log("Trying to stop", mediaRecorderRef.current);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.addEventListener("stop", handleStop);

      if (mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      setIsRecordingEngaged(false);
    }
  };

  const engageRecording = () => {
    setIsPlaying(true);
    setIsRecordingEngaged(true);
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      recordedChunksRef.current.push(event.data);
    }
  };

  const handleStop = async () => {
    const blob = new Blob(recordedChunksRef.current, {
      type: "audio/webm",
    });

    blob._sprite = {
      trimmed:[0, masterLengthInMS+preRoll+postRoll]
    }
    // ... rest of the stopRecording logic ...

    const base64Audio = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    console.log("base64Audio", base64Audio);
    const howl = new Howl({
      src: [base64Audio],
      format: [],
    });
    console.log("howl", howl);
    addToHowlArray(howl);
    recordedChunksRef.current = [];
  };

  useEffect(() => {
    console.log(
      isRecordingEngaged &&
        !isRecording &&
        masterPositionStep === masterLengthInSteps - 1
    );

    if (
      isRecordingEngaged &&
      !isRecording &&
      masterPositionStep === masterLengthInSteps - 1
    ) {
      console.log("STARTING");
      startRecording().then(() => {
        console.log("STOPPING IN MASTERLENGTHINMS", masterLengthInMS+preRoll+postRoll);
        setTimeout(stopRecording, masterLengthInMS+preRoll+postRoll+1000);
      });
    }

    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.removeEventListener(
          "dataavailable",
          handleDataAvailable
        );
        mediaRecorderRef.current.removeEventListener("stop", handleStop);
      }
    };
  }, [
    isRecordingEngaged,
    isRecording,
    masterPositionStep,
  ]);

  useEffect(() => {
    console.log("recordedChunksRef", recordedChunksRef);
  }, [recordedChunksRef]);

  return (
    <Wrapper>
      
      <Button onClick={engageRecording}>Record
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Button = styled.button``;

export default Recorder;
