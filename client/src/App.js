import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import { GlobalProvider } from './context/GlobalState';
import Registration from './components/Registration';
import { createBrowserHistory as history} from 'history';

function App() {
  return (
    <Router history={history()}>
    <GlobalProvider>
      <Switch>
      <Route exact path="/" component={Registration}/>
      <Route path="/home" component={Home}/>
      <Route path="/login" component={Login}/>
      </Switch>
    </GlobalProvider>
    </Router>
  );
}

export default App;
