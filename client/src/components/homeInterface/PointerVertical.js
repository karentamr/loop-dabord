import React, { useEffect } from "react";
import styled from "styled-components";
import { useContext, useState } from "react";
import { LooperContext } from "../context/LooperContextProvider";

const PointerHorizontal = () => {
  const {masterBPM, } = useContext(LooperContext);

  const [loopPositionPercent, setLoopPositionPercent] = useState(0);

  

  return (
    <Wrapper>
      <Pointer style={{ 
      width: `${loopPositionPercent}%`,
      transition: `width linear ${(60 / masterBPM)}s` 
    }} />
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
  top: 0;
  left: 0;
  height: 3px;
  background-color: black;
`;

export default PointerHorizontal;