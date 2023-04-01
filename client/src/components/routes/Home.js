import React from 'react';
import styled from 'styled-components';
import Track from '../trackInterface/Track';
import TrackPlayer from '../context/TrackPlayer';
import PointerVertical from '../homeInterface/PointerVertical';
import MainLoop from '../context/MainLoop';
import Recorder from '../context/Recorder';
import Metronome from '../homeInterface/Metronome'; 

import { useState } from 'react';

const Home = () => {
    const [canShow, setCanShow] = useState(false);

    //onclick anywhere canShow is set to true
    const handleClick = () => {
        setCanShow(true);
    };



    return (
        
        <Wrapper onClick={handleClick}>
            {canShow && 
            <>
            <MainLoop/>
            <Recorder/>
            <TrackPlayer/>
            <PointerVertical/>
            <Metronome/></>
}   
        </Wrapper>
    );
    };

const Wrapper = styled.div`
position:relative;
background-color :#454545;
height:100vh;
padding: 20px;
`

export default Home;

