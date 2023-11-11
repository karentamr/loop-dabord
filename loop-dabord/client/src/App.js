import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import GlobalStyles from './GlobalStyles';

import Header from './components/floating/Header';
import Home from './components/routes/Home';
import Profile from './components/routes/Profile';
import Authenticate from './components/routes/Authenticate';  
import Looper from './components/routes/Looper';


function App() {
  return (
    <>
    <GlobalStyles/>
    <Router>
    <Header/>

      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/Looper" element = {<Looper />} />
        <Route path = "/authenticate" element = {<Authenticate />} />
        <Route path = "/profile" element = {<Profile />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
