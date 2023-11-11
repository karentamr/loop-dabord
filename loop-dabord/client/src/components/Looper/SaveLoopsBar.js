import React, { useContext, useState } from "react";
import styled from "styled-components";
import { LooperContext } from "../context/LooperContextProvider";
import { UserContext } from "../context/UserContextProvider";

const SaveLoad = () => {
  const {
    masterBPM,
    masterLengthInSteps,
    arrayOf64Audio,
  } = useContext(LooperContext);
  const { currentUser } = useContext(UserContext);
  const [name, setName] = useState("");

  // Function to save the loop
  const handleSaveClick = () => {
    const loopToSave = {
      name: name,
      bpm: masterBPM,
      length: masterLengthInSteps,
      arrayOf64Audio: arrayOf64Audio,
    };

    fetch(`/api/loops/${currentUser._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loop: loopToSave }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Wrapper>
      <NameInput
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Name your loop"
      />
      <SaveButton onClick={handleSaveClick}>Save</SaveButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap:10px;
  align-items: center;
  align-self:flex-end;
  transform: translateY(-16%);


`;

const NameInput = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  font-size: 1.2rem;
  margin-right: 1rem;
  cursor: text;
  background-color: transparent;
  color: var(--primary-color);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--secondary-color);
    color: white;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color);
  }
`;

const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  height:40px;
  width:100px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--secondary-color);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export default SaveLoad;
