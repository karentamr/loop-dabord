import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { LooperContext } from "../context/LooperContextProvider";
import WaveSurfer from "./WaveSurfer";

const Track = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingEngaged, setIsRecordingEngaged] = useState(false);
  const [startedRecordingAt, setStartedRecordingAt] = useState(null);
  const [trackURL, setTrackURL] = useState(null);

  const {
    ctx,
    addToBufferArray,
    masterBPM,
    masterLengthInMS,
    recordATrack,
  } = useContext(LooperContext);






  return (
    <Wrapper>
      <RecordButton
        isRecordingEngaged={isRecordingEngaged}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </RecordButton>
      <WaveSurferWrapper>
        <WaveSurfer trackURL={trackURL} />
      </WaveSurferWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const RecordButton = styled.button``;

const WaveSurferWrapper = styled.div``;

export default Track;
