import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { LooperContext } from "../context/LooperContextProvider";
import { UserContext } from "../context/UserContextProvider";

import TrackPlayer from "../Looper/Player";
import PointerVertical from "../Looper/PointerVertical";
import MainLoop from "../context/MainLoop";
import Recorder from "../Looper/Recorder";
import Metronome from "../Looper/Metronome";
import Loops from "../Looper/Loops.js";

const Looper = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated, isLoading, logout } = useContext(UserContext);
  const { isGuest, setIsGuest, arrOfTracks, isFirstRender } =
    useContext(UserContext);
  const { setMasterBPM, setMasterLengthInSteps } = useContext(LooperContext);

  console.log("isAuthenticated", isAuthenticated);
  console.log("isGuest", isGuest);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isAuthenticated & !isGuest) {
      navigate("/authenticate");
    }
  }, [isAuthenticated, isGuest]);

  return (
    <Wrapper>
      
      <MainLoop />
      <Metronome />


      <ToolBarWrapper>
        <TrackPlayer />
        <Recorder />
        
      </ToolBarWrapper>

      <Loops />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  overflow: auto;
`;

const ToolBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items:start;
  width: 100%;
  padding-left:5%;
  padding-right:5%;
  padding-top:2.5%;
  padding-bottom:2.5%;
  border: 5px solid var(--color-1);
  gap:20px;

  `;
export default Looper;
