import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PointerVertical from "../Looper/PointerVertical";
import MainLoop from "../context/MainLoop";
import Recorder from "../Looper/Recorder";
import Metronome from "../Looper/Metronome";
import Loops from "../Looper/Loops.js";
import { FaRegPlayCircle } from "react-icons/fa";
import { UserContext } from "../context/UserContextProvider";
import { LooperContext } from "../context/LooperContextProvider";
import { Howl } from "howler";
import LandingPage from "../homeInterface/LandingPage";
import Loading from "../floating/Loading";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useContext(UserContext);
  const navigate = useNavigate();
  const { isGuest, setIsGuest,isFirstRender, setIsFirstRender, currentUser, setCurrentUser} = useContext(UserContext);
  const { setMasterBPM, setMasterLengthInSteps,  clearEverything,tick1,tick2 } = useContext(LooperContext);
  const [bpmSliderValue, setBpmSliderValue] = useState(120);
  const [masterLengthSliderValue, setMasterLengthSliderValue] = useState(16);
  const stickyLengthValues = [4, 8, 16, 32, 64];
  const [isHovering, setIsHovering] = useState(false);

  if (!isAuthenticated & !isGuest & !isFirstRender) {
    navigate("/authenticate");
  }
  const metroTimeout = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);


  const playSound1 = () => {
    tick1.volume(0.3);
    tick1.play();
  };

  const playSound2 = () => {
    tick2.volume(0.8);
    tick2.play();
  };

  const handleMouseEnter = () => {
    playSound1();
    setTimeout(() => {
      playSound2();
      setTimeout(() => {
        playSound2();
        setTimeout(() => {
          playSound2();
        }, 60000 / bpmSliderValue);
      }, 60000 / bpmSliderValue);
    }, 60000 / bpmSliderValue);
  };

  const [canShow, setCanShow] = useState(false);

  const handleBPMSliderChange = (e) => {
    setBpmSliderValue(e.target.value);
  };

  const handleMasterLengthSliderChange = (e) => {
    const currentValue = parseInt(e.target.value);
    let closestValue = stickyLengthValues.reduce((prev, curr) =>
      Math.abs(curr - currentValue) < Math.abs(prev - currentValue)
        ? curr
        : prev
    );
    setMasterLengthSliderValue(closestValue);
  };


  const handleClick = () => {
    setIsHovering(false);
    clearInterval(metroTimeout.current);
    clearEverything();
    setMasterBPM(bpmSliderValue);
    setMasterLengthInSteps(masterLengthSliderValue);
    
    navigate("/looper");
    
  };
  
 


  

  return (
    <Wrapper>
      {isLoading && <Loading/>}
      {!isLoading && isFirstRender && <LandingPage/>}

      {!isLoading &&  !isFirstRender && (
        <>
          <ControlsWrapper>
            <LeftColumn>
              <SliderValue>{bpmSliderValue}</SliderValue>
              <SliderText>BPM </SliderText>
              <RangeSlider
                type="range"
                min="40"
                max="400"
                value={bpmSliderValue}
                onChange={handleBPMSliderChange}
              />
              <SliderValue>{masterLengthSliderValue}</SliderValue>
              <SliderText>Length in Beats</SliderText>
              <RangeSlider
                type="range"
                min="4"
                max="64"
                step="1"
                value={masterLengthSliderValue}
                onChange={handleMasterLengthSliderChange}
              />
            </LeftColumn>
            <RightColumn>
              <PlayButton>
                <FaRegPlayCircle
                  size={200}
                  onClick={handleClick}
                  onMouseEnter={handleMouseEnter}
                />
              </PlayButton>
            </RightColumn>
          </ControlsWrapper>
        </>
      )}
    </Wrapper>
  );
};

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top:20vh;
  border-right: 1px solid var(--primary-color);
  gap: 20px;
  height: 100vh;
  
`;
const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top:40vh;
  gap: 20px;
`;

const SliderText = styled.p`
  font-size: 1.5rem;
  font-weight: 600;

  
  
`;
const SliderValue = styled.p`
  font-size: 8rem;
  font-weight: 600;
  
`;
const PlayButton = styled.button`
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: var(--primary-color);
  &:hover {
    background-color: var(--secondary-color);
    color: var(--primary-color);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const Wrapper = styled.div`
  position: relative;

  height: 100vh;

`;

const ControlsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const RangeSlider = styled.input`

  width: 50%;
  height: 20px;
  background: transparent;

  &:focus {
    outline: none;
  }

  //WEBKIT
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ffffff;
    margin-top: 2px;
    box-shadow: 1px 1px 2px rgba(#000, 0.5);

    cursor: pointer;
    
    
  }

  &::-webkit-slider-runnable-track {
    width: 60%;
    height: 20px;
    background: #bdbdbd;
    border-radius: 3rem;

    transition: all 0.5s;
    cursor: pointer;
  }

  &:hover::-webkit-slider-runnable-track {
    background: var(--primary-color);
  }


`;

export default Home;
