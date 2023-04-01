import React, { useEffect } from "react";
import styled from "styled-components";
import { useContext, useState } from "react";
import { LooperContext } from "../context/LooperContextProvider";

const PointerHorizontal = () => {
  const {masterPositionStep,masterLengthInSteps,masterBPM} = useContext(LooperContext);

  const [loopPositionPercent, setLoopPositionPercent] = useState(0);

  useEffect(() => {
    setLoopPositionPercent((masterPositionStep / masterLengthInSteps) * 100);

  }, [masterPositionStep]);




  

  return (
    <Wrapper>
      <Pointer loopPositionPercent={loopPositionPercent} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
`;

const Pointer = styled.div`
  position: absolute;
  left: ${props => props.loopPositionPercent}%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background-color: #ffa500;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 165, 0, 0.5);
  transition: left 200ms ease-out;
  animation: pulse 2s ease-in-out infinite;
  
  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid #ffa500;
  }
  
  &::after {
    content: "";
    position: absolute;
    top: -5px;
    right: -5px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #ffa500;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default PointerHorizontal;