import React from 'react';
import logo from './logo.svg';
import Hello from './components/welcome/Hello'
import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Authentification from "./components/Authentification/Authentification";
function App() {
  return (
    <div className="App">

          <BrowserRouter>
              <Switch>
                  <Route exact path={'/'} component={Authentification}/>
                  <Route exact path={'/Welcome'} component={Hello}/>
              </Switch>
          </BrowserRouter>


    </div>
  );
}

export default App;
