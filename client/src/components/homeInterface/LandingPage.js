import React, { useState, useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Howl } from 'howler';
import { UserContext } from "../context/UserContextProvider";

import Loading from '../floating/Loading';
import { LooperContext } from '../context/LooperContextProvider';


const LandingPage = () => {
  const navigate = useNavigate();
  const [playButtonOpacity, setPlayButtonOpacity] = useState(0);
  const [titleWrapperOpacity, setTitleWrapperOpacity] = useState(1);
  const [letterPositions, setLetterPositions] = useState([
    { id: 1, letter: 'L', left: '8.5%', top: '0%', rotate: '0deg' },
    { id: 2, letter: 'O', left: '14%', top: '0%', rotate: '0deg'},
    { id: 3, letter: 'O', left: '23%', top: '0%', rotate: '0deg' },
    { id: 4, letter: 'P', left: '32%', top: '0%', rotate: '0deg' },
    { id: 5, letter: 'D', left: '42%', top: '0%', rotate: '0deg' },
    { id: 6, letter: 'A', left: '49.5%', top: '0%', rotate: '0deg' },
    { id: 7, letter: 'B', left: '57.75%', top: '0%', rotate: '0deg' },
    { id: 8, letter: 'O', left: '65.25%', top: '0%', rotate: '0deg' },
    { id: 9, letter: 'R', left: '74%', top: '0%', rotate: '0deg' },
    { id: 10, letter: 'D', left: '82%', top: '0%', rotate: '0deg' },
  ]);
  const [isClicked, setIsClicked] = useState(false);
  const { user, isAuthenticated, isLoading } = useContext(UserContext);
  const {isGuest, setIsGuest, isFirstRender,  currentUser, setCurrentUser} = useContext(UserContext);
  const {tick1, tick2} = useContext(LooperContext);
  
  const {setIsFirstRender} = useContext(UserContext);

 

  const playTick1 = () => {
    tick1.volume(0.3);
    tick1.play();
  };

  const playTick2 = () => {
    tick2.volume(0.8);
    tick2.play();
  };



  const updateLetterPosition = (id, left, top,rotate) => {
    setLetterPositions(prevPositions => {
      const updatedPositions = prevPositions.map(position => {
        if (position.id === id) {
          return { ...position, left, top, rotate};
        }
        return position;
      });
      return updatedPositions;
    });
  };
  

  const updateTick = () => {
    setLetterPositions((prevPositions) => {
      const newPositions = [...prevPositions];
      const firstLetter = newPositions.shift();
      newPositions.push(firstLetter);
      return newPositions;
    });
  };

  useEffect(() => {
    console.log('isClicked', isClicked)
    if(isClicked) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      
      const timer1 = setTimeout(() => {
        playTick1();
        updateLetterPosition(5, '42%', '75%',"0deg");
        updateLetterPosition(6, '49.5%', '0%',"180deg");
        
      }, 500);
      const timer2 = setTimeout(() => {
        playTick2();
        updateLetterPosition(6, '49.5%', '75%',"180deg");
        updateLetterPosition(5, '42%', '75%',"180deg");
      }, 1000);
      const timer3 = setTimeout(() => {
        playTick2();
        updateLetterPosition(5, '19%', '75%',"180deg");
        updateLetterPosition(6, '65.5%', '75%',"90deg");
        updateLetterPosition(7, '49.5%', '0%',"0deg");
      }, 1500);
      const timer4 = setTimeout(() => {
        playTick2 ();
        updateLetterPosition(5, '19%', '75%',"90deg");
        updateLetterPosition(6, '65.5%', '0%',"0deg");
        updateLetterPosition(7, '49.5%', '0%',"0deg");
        updateLetterPosition(8, '57%', '0%',"0deg");

      }, 2000);

      const timer5 = setTimeout(() => {
        setTitleWrapperOpacity(0);
        setIsFirstRender(false);
      }, 3500);

      const timer6 = setTimeout(() => {
        setIsFirstRender(false);
        
        navigate('/authenticate');
        
      }, 6000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        clearTimeout(timer5);
        clearTimeout(timer6);
      };
    }


  }, [isClicked]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      updateTick();
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayButtonOpacity(1);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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

  useEffect(() => {
    if (isAuthenticated) {
      setIsFirstRender(false);
      navigate('/');
    }
  }, [isAuthenticated]);
    

  return (
    <Wrapper>
      {isLoading && <Loading />}
      {!isLoading && !isAuthenticated && !isGuest && 
      <TitleWrapper opacity={titleWrapperOpacity}>
        <Title>
          {letterPositions.map(({ letter, left,top,rotate }, index) => (
            <Letter key={index} style={{ left,top,rotate }}>
              {letter}
            </Letter>
          ))}
        </Title>
        <PlayButtonWrapper>
          <PlayButton opacity={playButtonOpacity} onClick={() => setIsClicked(true)}>▶</PlayButton>
        </PlayButtonWrapper>
        </TitleWrapper>
      
  }
  </Wrapper>
  );
}

      
const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

`;

const TitleWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 50vh;
  width: 100vw;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 0.5s ease-in;
`;

const Title = styled.h1`
  position: absolute;

  height: 25vh;
  width: 100vw;
  font-size: 25vh;
  margin-bottom: 20px;
  animation: ${slideDown} 2s ease-out;
  font-family: 'Lilita One', sans-serif;
`;

const Letter = styled.span`
  position: absolute;
  display: inline;
`;

const PlayButtonWrapper = styled.div`
  position: absolute;
  align-items: center;
  background-color:none;
  top: 25.6%;
  left: 18.9%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const PlayButton = styled.button `
width: 12vh; 
height: 12vh; 
border: none; 
border-radius: 50%; 
background-color: var(--primary-color);
font-size: 7vh; 
color: var(--secondary-color); 
opacity: ${({ opacity }) => opacity}; 
cursor: pointer; 
transition: all 0.3s ease; 

`;

export default LandingPage;