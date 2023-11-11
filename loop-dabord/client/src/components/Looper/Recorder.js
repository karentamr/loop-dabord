import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LooperContext } from "../context/LooperContextProvider";
import SaveLoopsBar from "./SaveLoopsBar";
import { Howl } from "howler";
import MediaRecorderDropdown from "./MediaRecorderDropdown";
import { UserContext } from "../context/UserContextProvider";
import { FaCircle, FaTrash } from "react-icons/fa";

const Recorder = () => {
  // Accessing necessary context values
  const {
    audioContext,
    addToHowlArray,
    masterPositionStep,
    isPlaying,
    setIsPlaying,
    masterLengthInSteps,
    masterLengthInMS,
    togglePlay,
    preRoll,
    postRoll,
    masterBPM,
    addToBlobURLArray,
    selectedAudioDevice,
    arrayOfHowls,
    addTo64Array,
    isMetronomeOn,
    setIsMetronomeOn,
    clearEverything,
  } = useContext(LooperContext);
  const { currentUser } = useContext(UserContext);

  // State and ref declarations
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingEngaged, setIsRecordingEngaged] = useState(false);
  const [volume, setVolume] = useState(1);
  const navigate = useNavigate();
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  // Function to wait for media data to become available
  const waitForDataAvailable = (mediaRecorder) =>
    new Promise((resolve) => {
      const onDataAvailable = (event) => {
        if (event.data.size > 0) {
          resolve(event);
        }
      };

      mediaRecorder.addEventListener("dataavailable", onDataAvailable);
    });

  // Function to start recording
  const startRecording = async () => {
    setIsRecording(true);
    if (!isPlaying) togglePlay();

    // Setting up constraints for recording
    const constraints = {
      audio: {
        deviceId: selectedAudioDevice ? { exact: selectedAudioDevice } : undefined,
        volume: volume,
      },
    };

    // Creating media recorder
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.start(100);

    // Handling data availability
    const handleData = async () => {
      const event = await waitForDataAvailable(mediaRecorderRef.current);
      handleDataAvailable(event);

      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        setTimeout(handleData, 100);
      }
    };

    handleData();
  };

  // Function to stop recording
  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.addEventListener("stop", handleStop);

      if (mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      setIsRecordingEngaged(false);
    }
  };

  // Engaging the recording process
  const engageRecording = () => {
    setIsPlaying(true);
    setIsRecordingEngaged(true);
  };

  // Handling available data during recording
  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      recordedChunksRef.current.push(event.data);
    }
  };

  // Handling recording stop
  const handleStop = async () => {
    const blob = new Blob(recordedChunksRef.current, { type: "audio/wav" });
    const base64Audio = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    addTo64Array(base64Audio);
    const howl = new Howl({ src: [base64Audio], format: ['wav'] });
    addToHowlArray(howl);

    const audioUrl = URL.createObjectURL(blob);
    addToBlobURLArray(audioUrl);

    recordedChunksRef.current = [];
  };

  // Handling volume change
  const handleVolumeChange = (event) => {
    setVolume(event.target.value / 100);
  };

  // Effect to manage recording lifecycle
  useEffect(() => {
    if (isRecordingEngaged && !isRecording && masterPositionStep === masterLengthInSteps - 1) {
      setTimeout(() => {
        startRecording().then(() => {
          setTimeout(stopRecording, masterLengthInMS + preRoll + postRoll);
        });
      }, (60000 / masterBPM) - preRoll - 100);
    }

    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.removeEventListener("dataavailable", handleDataAvailable);
        mediaRecorderRef.current.removeEventListener("stop", handleStop);
      }
    };
  }, [isRecordingEngaged, isRecording, masterPositionStep]);

  // Toggle metronome
  const handleToggle = () => {
    setIsMetronomeOn(!isMetronomeOn);
  };

  // Clear everything and redirect to home
  const clearAndRedirect = () => {
    clearEverything();
    navigate("/");
  };

  return (
    <Wrapper>
      <RecordWrapper>
        <RecordButton
          onClick={isRecording ? null : engageRecording}
          isRecording={isRecording}
          isRecordingEngaged={isRecordingEngaged}
        >
          <FaCircle
            size={60}
            color={
              isRecording
                ? "#e60005"
                : isRecordingEngaged
                ? "#F15025"
                : "#74de77"
            }
          />
        </RecordButton>
        <VolumeSlider
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={handleVolumeChange}
        />
      </RecordWrapper>
      <SwitchLabelWrapper>
        <SwitchLabel>Metro</SwitchLabel>
        <SwitchWrapper>
          <SwitchInput
            type="checkbox"
            checked={isMetronomeOn}
            onChange={handleToggle}
          />
          <Slider isOn={isMetronomeOn} />
        </SwitchWrapper>
      </SwitchLabelWrapper>
      <MediaRecorderDropdown></MediaRecorderDropdown>

      {arrayOfHowls.length > 0 && currentUser && <SaveLoopsBar />}
      <ClearButton onClick={clearAndRedirect}>
        <TrashIcon />
      </ClearButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width:100%;
  gap: 20px;
`;

const RecordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const SwitchWrapper = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SwitchLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  gap: 10px;
  `;

const SwitchLabel = styled.label`
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Lilita One', cursive;
  color: var(--primary-color);

`;
const ClearButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 0;
  align-self: flex-start;
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

const TrashIcon = styled(FaTrash)`
  margin-right: 10px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  width: 34px;
  height: 60px;
  background-color: var(--primary-color);
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    width: 26px;
    height: 26px;
    bottom: 4px;
    left: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: var(--secondary-color);
  }

  &:checked + ${Slider}:before {
    transform: translateY(-26px);
    background-color: white;
  }
`;

const RecordButton = styled.button`
  width: 120px;
  height: 120px;
  background-color: #bf0005;
  border-radius: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  svg {
    transition: all 0.2s ease-in-out;
    height: 80px;
    width: 110px;
  }
  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const VolumeSlider = styled.input`
  margin: auto;
  -webkit-appearance: none;
  position: relative;
  overflow: hidden;
  height: 30px;
  width: 160px;
  cursor: pointer;
  ::-webkit-slider-runnable-track {
    background: var(--background-color-darker);
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 30px;
    background: var(--secondary-color);
    box-shadow: -200px 0 0 200px dodgerblue;
    border: 2px solid var(--color-1);
  }

  ::-moz-range-track {
    height: 30px;
    background: #ddd;
  }

  ::-moz-range-thumb {
    background: #fff;
    height: 30px;
    width: 20px;
    border: 3px solid #999;
    border-radius: 0 !important;
    box-shadow: -200px 0 0 200px dodgerblue;
    box-sizing: border-box;
  }

  ::-ms-fill-lower {
    background: dodgerblue;
  }

  ::-ms-thumb {
    background: #fff;
    border: 2px solid #999;
    height: 40px;
    width: 20px;
    box-sizing: border-box;
  }

  ::-ms-ticks-after {
    display: none;
  }

  ::-ms-ticks-before {
    display: none;
  }

  ::-ms-track {
    background: var(--background-color-darker);
    color: transparent;
    height: 40px;
    border: none;
  }

  ::-ms-tooltip {
    display: none;
  }
`;

export default Recorder;
