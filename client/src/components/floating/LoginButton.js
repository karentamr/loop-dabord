import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import { LooperContext } from "../context/LooperContextProvider";
import { AiOutlineLogin } from "react-icons/ai";

const LoginButton = () => {
  const navigate = useNavigate();
  const { setIsGuest } = useContext(UserContext);
  const { setIsPlaying } = useContext(LooperContext);
  const handleLoginClickByGuest = () => {
    setIsPlaying(false);
    setIsGuest(false);
    navigate("/authenticate");
  };

  return (
    <Wrapper>
      <Button onClick={handleLoginClickByGuest}>
        <AiOutlineLogin />
      </Button>
      <Text>LOGIN</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 3%;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 20px;
  margin: 0;
  padding: 0;
  color: var(--primary-color);
  pointer-events: none;
  font-family: 'Lilita One', sans-serif;

`;

const Button = styled.button`
  height: 50px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 50px;
  color: var(--background-color);
  &:hover {
    color: var(--primary-color);
  }
`;

export default LoginButton;
