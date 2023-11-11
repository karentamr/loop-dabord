import  { useContext, useState, useEffect } from "react";

import { LooperContext } from "../context/LooperContextProvider";

const MainLoop = () => {
    // Accessing state and functions from LooperContext
    const { 
        masterBPM,
        masterLengthInSteps,
        isPlaying,
        setIsPlaying,
        setMasterPositionStep,
        masterTogglePlay
    } = useContext(LooperContext);
    
    // State for interval ID to manage the loop timing
    const [intervalId, setIntervalId] = useState(null);

    // Function to toggle play/pause state
    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    // Assigning togglePlay function to a ref for external access
    masterTogglePlay.current = togglePlay;

    // Function to increment the master position step
    const playTick = () => {
        setMasterPositionStep((prevMasterPositionStep) => (prevMasterPositionStep + 1) % masterLengthInSteps);
    };
    
    // Setting up and clearing interval for playTick based on isPlaying and masterBPM
    useEffect(() => {
        let newIntervalId;
        if (isPlaying) {
            // Clearing existing interval if it exists
            if (intervalId) clearInterval(intervalId);
    
            // Creating a new interval for ticking based on BPM
            newIntervalId = setInterval(playTick, 60000 / masterBPM);
            setIntervalId(newIntervalId);
        } else {
            // Clearing interval when playback is paused
            if (intervalId) clearInterval(intervalId);
            setIntervalId(null);
        }
    
        // Cleanup function to clear interval on unmount
        return () => {
            clearInterval(newIntervalId);
        };
    }, [isPlaying, masterBPM]);

    // Component's render JSX (to be implemented)
    return 
}

export default MainLoop;
