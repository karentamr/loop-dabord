import React, { useEffect } from "react";
import styled from "styled-components";
import { useContext, useState } from "react";
import { LooperContext } from "../context/LooperContextProvider";

const PointerVertical = ({ clipPercentage }) => {
  const { masterPositionStep, masterLengthInSteps, masterBPM } = useContext(
    LooperContext
  );

  const [loopPositionPercent, setLoopPositionPercent] = useState(0);

  useEffect(() => {
    setLoopPositionPercent((masterPositionStep / masterLengthInSteps) * 100);
  }, [masterPositionStep]);

  const verticalLines = Array.from({ length: masterLengthInSteps }, (_, index) => (
    <VerticalLine key={index} positionPercent={(index / masterLengthInSteps) * 100} />
  ));

  return (
    <OuterWrapper clipPercentage={clipPercentage}>
      <Wrapper>
        {verticalLines}
        <Pointer loopPositionPercent={loopPositionPercent} />
      </Wrapper>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  position: absolute;
  top: 0;
  left: ${({ clipPercentage }) => clipPercentage}%;
  width: ${({ clipPercentage }) => 100 - clipPercentage}%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

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
