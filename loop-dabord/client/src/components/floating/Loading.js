import React from 'react';
import styled, { keyframes } from 'styled-components';




const Loading = () => {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  };



const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top-color: #1e90ff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s ease-in-out infinite;
`;



export default Loading;