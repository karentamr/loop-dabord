import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
    return (
        <Wrapper>
        <Title>LOOP D'ABORD</Title>
        </Wrapper>
    );
    }

const Wrapper = styled.div`
background-color: var(--primary-color);

width: 100%;
`
const Title = styled.h1`
color: var(--secondary-color);
font-size: 60px;
text-align: center;
line-height: 2;
`

export default Header;