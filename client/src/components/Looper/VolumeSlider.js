import React, { useContext } from "react";
import { LooperContext } from "../context/LooperContextProvider";
import styled from "styled-components";

const VolumeSlider = () => {
  const { masterVolume, setMasterVolume } = useContext(LooperContext);

  const handleVolumeChange = (e) => {
    setMasterVolume(parseFloat(e.target.value));
  };

  return (
    <Slider
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={masterVolume}
      onChange={handleVolumeChange}
    />
  );
};

const Slider = styled.input`
  margin: auto;
  -webkit-appearance: none;
  position: relative;
  overflow: hidden;
  height: 30px;
  width: 160px;
  transform: translateX(-8px);
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

export default VolumeSlider;
