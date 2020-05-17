import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home';
import { GlobalProvider } from './context/GlobalState';
import Registration from './components/Registration';
// import { Router } from 'express';

function App() {
  return (
    <Router>
    <GlobalProvider>
      <Route exact path="/" component={Registration}></Route>
      <Route path="/home" component={Home}></Route>
      {/* <Registration/>
      <Home/> */}
    </GlobalProvider>
    </Router>
  );
}

export default App;
