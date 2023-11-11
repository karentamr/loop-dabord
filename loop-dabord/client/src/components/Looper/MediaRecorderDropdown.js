import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { LooperContext } from "../context/LooperContextProvider";

//A dropdown component for selecting an audio input device to use with the MediaRecorder.

const MediaRecorderDropdown = () => {
  const [audioDevices, setAudioDevices] = useState([]);
  const { setSelectedAudioDevice } = useContext(LooperContext);

  useEffect(() => {
    async function getDevices() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = devices.filter(
          (device) => device.kind === "audioinput"
        );

        setAudioDevices(audioDevices);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    }

    getDevices();
  }, []);

  const handleAudioDeviceChange = (event) => {
    const selectedDeviceId = event.target.value;
    setSelectedAudioDevice(selectedDeviceId);
  };

  return (
    <Wrapper>
      <Label htmlFor="audioDevices">Audio Input: </Label>
      <Select id="audioDevices" onChange={handleAudioDeviceChange}>
        {audioDevices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap:10px;
  margin-left: 2rem;
  
  `
const Label = styled.label`
  color: var(--primary-color);
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Lilita One', cursive;
  align-self: center;
  `
const Select = styled.select`
  padding: 0.5rem;
  width:300px;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  font-size: 1.2rem;
  margin: 1rem 0;
  cursor: pointer;
  background-color: transparent;
  color: var(--primary-color);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--secondary-color);
    color: white;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color);
  }
`;

export default MediaRecorderDropdown;
