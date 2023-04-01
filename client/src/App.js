import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './components/routes/Home';
import Header from './components/floating/Header';
import GlobalStyles from './GlobalStyles';






function App() {
  return (
    <>
    <GlobalStyles/>
    <Header/>
    <Router>
      <Routes>
        <Route path = "/" element = {<Home />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
