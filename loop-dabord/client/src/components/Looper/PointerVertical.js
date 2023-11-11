import React, { useEffect } from "react";
import styled from "styled-components";
import { useContext, useState } from "react";
import { LooperContext } from "../context/LooperContextProvider";

const PointerVertical = ({ clipPercentage }) => {
  // Accessing necessary context values
  const { masterPositionStep, masterLengthInSteps } = useContext(
    LooperContext
  );

  // State to track the loop's position percentage
  const [loopPositionPercent, setLoopPositionPercent] = useState(0);

  // Effect to update loop position based on context value changes
  useEffect(() => {
    setLoopPositionPercent((masterPositionStep / masterLengthInSteps) * 100);
  }, [masterPositionStep]);

  // Generate vertical lines for each step
  const verticalLines = Array.from({ length: masterLengthInSteps }, (_, index) => (
    <VerticalLine key={index} positionPercent={(index / masterLengthInSteps) * 100} />
  ));

  // Rendering the component
  return (
    <OuterWrapper clipPercentage={clipPercentage}>
      <Wrapper>
        {verticalLines}
        <Pointer loopPositionPercent={loopPositionPercent} />
      </Wrapper>
    </OuterWrapper>
  );
};

// Styled component for the outer wrapper
const OuterWrapper = styled.div`
  position: absolute;
  top: 0;
  left: ${({ clipPercentage }) => clipPercentage}%;
  width: ${({ clipPercentage }) => 100 - clipPercentage}%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
`;

// Styled component for the inner wrapper
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

// Styled component for the vertical lines
const VerticalLine = styled.div`
  position: absolute;
  left: ${({ positionPercent }) => positionPercent}%;
  top: 0;
  bottom: 0;
  width: 3px;
  margin-top:26px;
  background-color: var(--primary-color);
  min-height: 120px;
`;

// Styled component for the moving pointer
const Pointer = styled.div`
  position: absolute;
  left: ${props => props.loopPositionPercent}%;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: var(--secondary-color);
  transition: left 200ms ease-out;
  min-height: 100px;
`;

export default PointerVertical;
