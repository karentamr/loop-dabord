import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import { LooperContext } from "../context/LooperContextProvider";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import styled from "styled-components";
import { AiOutlineUser, AiOutlinePlayCircle } from "react-icons/ai";

const Header = () => {
  const { user, isAuthenticated, isLoading } = useContext(UserContext);
  const { isGuest, setIsGuest, currentUser, setCurrentUser } =
    useContext(UserContext);
  const { setIsPlaying } = useContext(LooperContext);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>LOOP D'ABORD</Title>
        {(isGuest || currentUser) && (
          <LooperButton onClick={() => navigate("/looper")}>
            <AiOutlinePlayCircle />
            <ButtonText>LOOPER</ButtonText>
          </LooperButton>
        )}
      </TitleWrapper>
      <IconWrapper>
      
        {currentUser && (
          <>
            <LogoutButton />
            <ProfileButton onClick={() => navigate("/profile")}>
              <AiOutlineUser />
              <ButtonText>PROFILE</ButtonText>
            </ProfileButton>
          </>
        )}
        {isGuest ? <LoginButton /> : <></>}
      </IconWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--secondary-color);
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const LooperButton = styled.button`
  position: absolute;
  top: 52%;
  transform: translateY(-50%);
  left: 3%;
  background: none;
  border: none;
  z-index: 10;
  cursor: pointer;
  font-size: 50px;
  color: var(--background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    color: var(--primary-color);
  }
`;

const TitleWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 120px;
  top: 0;

`;

const Title = styled.h1`
  color: var(--primary-color);
  font-size: 60px;
  text-align: center;
  line-height: 2;
  position: relative;
  margin: auto;
  pointer-events: none;
  font-family: 'Lilita One', sans-serif;
  font-weight:100;
`;

const ProfileButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 8%;
  background: none;
  border: none;
  z-index: 10;
  cursor: pointer;
  font-size: 50px;
  color: var(--background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    color: var(--primary-color);
  }
`;

const ButtonText = styled.p`
  font-size: 20px;
  margin: 0;
  padding: 0;
  color: var(--primary-color);
  pointer-events: none;
  font-family: 'Lilita One', sans-serif;

`;

export default Header;
