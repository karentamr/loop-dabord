import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const Waveform = ({ trackURL }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

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
    <div ref={waveformRef} style={{ pointerEvents: 'none' }}></div>
  );
};

export default Waveform;    
