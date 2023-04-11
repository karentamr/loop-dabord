import React, { useState, useRef, useEffect,useContext } from "react";
import styled, { css, keyframes } from "styled-components";
import { RiLoginCircleFill } from "react-icons/ri";
import { Howl } from "howler";
import { UserContext } from "../context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { LooperContext } from "../context/LooperContextProvider";


const Authenticate = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect,setIsFirstRender } = useContext(UserContext);

  const handleLoginRedirect = () => {
    loginWithRedirect({mode:'popup'} );
  };
  
  const { isGuest, setIsGuest, currentUser, setCurrentUser } = useContext(UserContext);
  const {tick1, tick2} = useContext(LooperContext);

  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [loginLeft, setLoginLeft] = useState(0);
  const [showGuest, setShowGuest] = useState(false);
  const [guestLeft, setGuestLeft] = useState();
  const [loginButtonClicked, setLoginButtonClicked] = useState(false);
  const [guestButtonClicked, setGuestButtonClicked] = useState(false);
  
  const guestLoop = useRef(null);
  const loginLoop = useRef(null);

  useEffect(() => {
  if(isGuest){
    clearInterval(loginLoop.current);
    clearInterval(guestLoop.current);
    navigate("/");
  } else if(isAuthenticated){
    
    clearInterval(loginLoop.current);
    clearInterval(guestLoop.current);
    navigate("/");


  }
  }, [isGuest, isAuthenticated,isLoading]);

 
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



  const handleLoginClick = () => {
    setLoginButtonClicked(true);
    clearInterval(loginLoop.current);
    playSound1();
    setTimeout(() => {
      playSound2();
      setShowLogin(false);
      setLoginLeft(25);
      setTimeout(() => {
        playSound2();
        setLoginLeft(50);
        setTimeout(() => {
          playSound2();
          setLoginLeft(75);
          setTimeout(() => {
            playSound1();
            setLoginLeft(100);
            handleLoginRedirect();
            console.log("isAuthenticated", isAuthenticated);
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  };

  const handleGuestClick = () => {
    setGuestButtonClicked(true);
    clearInterval(guestLoop.current);
    playSound1();
    setTimeout(() => {
      setGuestLeft(25);
      playSound2();
      setShowGuest(false);
      setTimeout(() => {
      setGuestLeft(50);
        playSound2();
        setTimeout(() => {
          setGuestLeft(75);
          playSound2();
          setTimeout(() => {
            setGuestLeft(100);
            playSound1();
            handleGuestLogin();
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  };

  const handleGuestLogin = () => {
    setIsFirstRender(false);

    setIsGuest(true);

    navigate("/");
  }
  const handleLoginHoverIn = () => {
    if(!loginButtonClicked && !guestButtonClicked){
    setShowGuest(false);
    setShowLogin(true);}
    playSound1();
    loginLoop.current = setInterval(() => {
      playSound1();
    }, 500);
  };

  const handleLoginHoverOut = () => {
    clearInterval(loginLoop.current);
  };

  const handleGuestHoverIn = () => {
    if(!loginButtonClicked && !guestButtonClicked){
    setShowLogin(false);
    setShowGuest(true);
    }
    playSound1();
    guestLoop.current = setInterval(() => {
      playSound1();
    }, 250);
  };

  const handleGuestHoverOut = () => {
    clearInterval(guestLoop.current);
  };

  return (
    <Wrapper>
      <LoginWrapper>
        <LoginButton
          onClick={handleLoginClick}
          onMouseEnter={handleLoginHoverIn}
          onMouseLeave={handleLoginHoverOut}
          loginLeft={loginLeft}
          loginButtonClicked={loginButtonClicked}
        />
        <LoginText show={showLogin}>LOGIN</LoginText>
      </LoginWrapper>
      <GuestWrapper>
        <GuestButton
          onClick={handleGuestClick}
          onMouseEnter={handleGuestHoverIn}
          onMouseLeave={handleGuestHoverOut}
          guestLeft={guestLeft}
          guestButtonClicked={guestButtonClicked}
        />
        <GuestText show={showGuest}>GUEST</GuestText>
      </GuestWrapper>
    </Wrapper>
  );
};



const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;

`;

const LoginWrapper = styled.div`
  position: relative;
  top: 24vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const GuestWrapper = styled.div`
  position: relative;
  top: 54vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const buttonStyle = css`
  font-size: 40vh;
  position: absolute;
  z-index: 5;
  transform: scale(1);

`;

const LoginButton = styled(RiLoginCircleFill)`
  ${buttonStyle}
  left: ${props => props.loginLeft}%;
  transition: left 0.3s ease-in-out;
  z-index: 10;
  color:var(--secondary-color);
  
  pointer-events: ${({ loginButtonClicked }) => (loginButtonClicked ? "none" : "auto")};

  &:hover {
    cursor: ${({ loginButtonClicked }) => (loginButtonClicked ? "default" : "pointer")};
    transform: ${({ loginButtonClicked }) => (loginButtonClicked ? "scale(1)" : "scale(1.2)")};
    transition: transform 0.1s ease-in-out;
  }
`;

const GuestButton = styled(RiLoginCircleFill)`
  ${buttonStyle}

  left: ${props => props.guestLeft}%;
  transition: left 0.3s ease-in-out;
  z-index: 10;
  color:var(--primary-color);
  
  pointer-events: ${({ guestButtonClicked }) => (guestButtonClicked ? "none" : "auto")};

  &:hover {
    cursor: ${({ guestButtonClicked }) => (guestButtonClicked ? "default" : "pointer")};
    transform: ${({ guestButtonClicked }) => (guestButtonClicked ? "scale(1)" : "scale(1.2)")};
    transition: transform 0.1s ease-in-out;
  }
  
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoginText = styled.h1`
  position: absolute;
  color: var(--primary-color);
  font-size: 40px;

  position: relative;
  left: 24vw;
  opacity: ${({ show }) => (show ? "1" : "0")};
  ${({ show }) =>
    show &&
    css`
      animation: ${fadeIn} 0.3s ease-in-out;
    `};
`;

const GuestText = styled.h1`
  position: absolute;
  color: var(--secondary-color);
  font-size: 40px;
  line-height: 2;
  position: relative;
  left: 24vw;


  opacity: ${({ show }) => (show ? "1" : "0")};
  ${({ show }) =>
    show &&
    css`
      animation: ${fadeIn} 0.3s ease-in-out;
    `};
`;
export default Authenticate;
