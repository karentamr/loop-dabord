import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { LooperContext } from "../context/LooperContextProvider";
import { UserContext } from "../context/UserContextProvider";

import { Howl } from "howler";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

const Profile = () => {
  const {masterBPM,
    setMasterBPM,
    masterLengthInSteps,
    setMasterLengthInSteps,
    masterLengthInMS,
    isPlaying,
    setIsPlaying,
    masterPositionInMS,
    setMasterPositionInMS,
    masterPositionStep,
    setMasterPositionStep,
    preRoll,
    postRoll,
    masterTogglePlay,
    addToHowlArray,
    arrayOfHowls,
    setArrayOfHowls,
    arrayOfBlobURLs,
    setArrayOfBlobURLs,
    addToBlobURLArray,
    masterVolume,
    setMasterVolume,
    selectedAudioDevice,
    setSelectedAudioDevice,
    clearEverything,
    arrayOf64Audio,
    setArrayOf64Audio,
} = useContext(LooperContext);
  const { isGuest, setIsGuest, currentUser, setCurrentUser } = useContext(UserContext);

  const { user, isAuthenticated, isLoading,logout } = useContext(UserContext);


  const [loops, setLoops] = useState([]);
  const navigate = useNavigate();


  //add currentUser._id to fetch
  useEffect(() => {
 

    if(!currentUser) return;
    fetch(`/api/loopsByUser/${currentUser._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          console.log("data", data);
          setLoops(data.loops);
        } else {
          alert(
            "There was a problem loading your loops. Please try again later."
          );
        }
      });
  }, [isLoading,currentUser]);

  // Function to convert base64 audio string to a Blob
function base64ToBlob(base64, mimeType = 'audio/wav') {
  const binary = atob(base64.split(',')[1]);
  const array = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }

  return new Blob([array], { type: mimeType });
}

// Function to convert an array of base64 audio strings to an array of object URLs
function convertBase64ArrayToObjectURLs(base64Array) {
  const blobArray = base64Array.map(base64 => base64ToBlob(base64));
  const objectURLArray = blobArray.map(blob => URL.createObjectURL(blob));

  return objectURLArray;
}

const convertBase64ArrayToHowls = (base64Array) => {
  const howlArray =[];

  base64Array.forEach((base64, index) => {
    howlArray.push({ howl: new Howl({
        src: [base64],
      }), index: index});
  });

  return howlArray;
}



  const handleLoad = (index) => {
    console.log("YOOOO")
    clearEverything();

    setMasterBPM(loops[index].loop.bpm);
    setMasterLengthInSteps(loops[index].loop.length);
    setArrayOf64Audio(loops[index].loop.arrayOf64Audio);

    setArrayOfBlobURLs(convertBase64ArrayToObjectURLs(loops[index].loop.arrayOf64Audio));
    setArrayOfHowls(convertBase64ArrayToHowls(loops[index].loop.arrayOf64Audio));
    navigate("/looper");
  }


  console.log("currentUser", currentUser)
    
  const handleDelete = (_id)  => {
    fetch(`/api/loops/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 202) {
          console.log("data", data);
          setLoops(loops.filter((loop) => loop._id !== _id));
        } else {
          alert(
            "There was a problem deleting your loop. Please try again later."
          );
        }
      });
  }

  return (
    <Wrapper>
    <TitleWrapper>
      <Title>Profile</Title>
      
      <LoopsWrapper>
        {loops.map((loop, index) => {
          return (
            <LoopWrapper>
              <LoopTitleWrapper>
                <LoopTitle>{loop.loop.name}</LoopTitle>
                <DeleteButton onClick={() => handleDelete(loop._id)}>
                  <AiOutlineDelete />
                </DeleteButton>
              </LoopTitleWrapper>
              <LoopInfoWrapper>
                <RowWrapper><LoopInfo>BPM:</LoopInfo><LoopInfoValue>{loop.loop.bpm}</LoopInfoValue></RowWrapper>
                <RowWrapper><LoopInfo>LENGTH:</LoopInfo><LoopInfoValue>{loop.loop.length} STEPS</LoopInfoValue></RowWrapper>
              </LoopInfoWrapper>
              <LoadButton onClick={() => handleLoad(index)}>LOAD</LoadButton>
            </LoopWrapper>
          );
        })}
      </LoopsWrapper>
    </TitleWrapper>
  </Wrapper>
  );
};

const RowWrapper = styled.div` 
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  `;
const LoopInfo = styled.p`
font-size: 20px;


`;
  const LoopInfoValue = styled.p`

  font-size: 20px;
  color: var(--primary-color);
  margin-left: 10px;
  `;


const LoopTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between ;
  justify-self: flex-start;
  align-self: left;
  width: 100%;
  

`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 30px;
  color: var(--primary-color);
  margin-left: 10px;

  &:hover {
    color: var(--accent-color);
  }
`;
const LoopInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height:100vh;
  padding: 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const LoopsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  
`;

const LoopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 2px solid var(--primary-color);
  border-radius: 4px;
  padding: 20px;
  margin: 10px;
  width: 400px;
`;

const LoopTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
`;



const LoadButton = styled.button`
  font-size: 14px;
  font-weight: bold;
  align-self: flex-end;
  color: white;
  background-color: var(--primary-color);
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #e76f51;
  }
`;

export default Profile;