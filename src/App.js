import React from 'react';
import Home from './Home';
import Auth from './Auth';
import Profile from './Profile';
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'><Home/></Route>
          <Route exact path='/auth'><Auth/></Route>
          <Route exact path='/users/:username'><Profile/></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
