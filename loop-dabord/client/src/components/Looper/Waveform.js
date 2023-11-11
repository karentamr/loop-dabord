import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import WaveSurfer from "wavesurfer.js";

const Waveform = ({ trackURL }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);


  // Effect to handle waveform creation
  useEffect(() => {

    if (!trackURL) return;

    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "violet",
      progressColor: "purple",
      hideScrollbar: true,
      
    });

    wavesurferRef.current.load(trackURL);

    return () => {
      wavesurferRef.current && wavesurferRef.current.destroy();
    };
  }, [trackURL]);

  return (
    <WaveFormSt ref={waveformRef} style={{ pointerEvents: 'none' }} ></WaveFormSt>
  );
};

const WaveFormSt = styled.div`
  width: 100%;
  height: 100%;
  `;
export default Waveform;    
