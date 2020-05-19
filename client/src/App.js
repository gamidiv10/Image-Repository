import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import { GlobalProvider } from './context/GlobalState';
import Registration from './components/Registration';

function App() {
  return (
    <Router className="router">
    <GlobalProvider>
      <Switch>
      <Route exact path="/register" component={Registration}/>
      <Route path="/home" component={Home}/>
      <Route path="/" component={Login}/>
      </Switch>
    </GlobalProvider>
    </Router>
  );
}

export default App;
