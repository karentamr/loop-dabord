import React, { useContext, useEffect, useRef,useState } from "react";
import { LooperContext } from "../context/LooperContextProvider";
import WaveSurfer from "wavesurfer.js";
import styled from "styled-components";
import Waveform from "./Waveform";
import PointerVertical from "./PointerVertical";

const Loops = () => {
  const {
    arrayOfBlobURLs,
    masterLengthInMS,
    preRoll,
    postRoll,
    masterBPM,
    masterLengthInSteps,
    deleteLoopFromAllArrays,
  } = useContext(LooperContext);

  const waveformsRef = useRef([]);
  const [clipPercentage, setClipPercentage] = useState(0);

  const colorProps = [
    "--rand-color0",
    "--rand-color1",
    "--rand-color2",
    "--rand-color3",
    "--rand-color4",
    "--rand-color5",
    "--rand-color6",
    "--rand-color7",
  ];


  // Calculates the percentage of the waveform that should be visible based on the pre-roll, post-roll, master length in steps, and master BPM. It updates the clipPercentage state variable.
    useEffect(() => {
      if(masterLengthInMS){
        setClipPercentage((preRoll+postRoll)/(preRoll+masterLengthInSteps*60000/masterBPM+postRoll)*100/1.5);
      }
    }, [masterLengthInMS]);

  
  return (
    <Wrapper>
    <LoopsWrapper
    preRoll={preRoll}
    postRoll={postRoll}
    masterLengthInMS={masterLengthInMS}
  >
    <Overlay
      clipPercentage={clipPercentage}
    />
    <PointerVertical clipPercentage={clipPercentage}/>
    {arrayOfBlobURLs.map((trackURL, index) => (<>
      <DeleteButton onClick={()=>deleteLoopFromAllArrays(index)}>X</DeleteButton>
      
      <LoopWrapper key={index} style={{ backgroundColor: `var(${colorProps[index % 8]})` }}>
        <Waveform trackURL={trackURL} />
      </LoopWrapper>
      </>
    ))}
  </LoopsWrapper>
  </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 0 80px;
  `;
const DeleteButton = styled.button`
align-self:flex-end;
border:none;
background-color:transparent;
color:var(--primary-color);
font-size:1.5rem;
font-weight:700;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(255,255,255,0.05);
  
  clip-path: inset(0 ${({ clipPercentage }) => clipPercentage}% 0 ${({ clipPercentage }) => clipPercentage}%);
  pointer-events: none;
`;
const LoopsWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap:5px;
  width: 100%;
  align-items: center;
  position: relative;
  clip-path: inset(0 ${props => props.clipPercentage}% 0 ${props => props.clipPercentage}%);
  border-radius: 10px;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: ${props =>
      ((props.preRoll + props.postRoll) / (props.preRoll + props.masterLengthInMS + props.postRoll)) *
      100}%;
    z-index: -1;
     // Change this color to the desired color for the clipped part
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;



const LoopWrapper = styled.div`
  width: 100%;

  height: auto;
  border-radius: 10px;
  overflow:hidden;
`;

export default Loops;
