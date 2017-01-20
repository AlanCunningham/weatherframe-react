import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import Weather from './Weather';

class App extends Component {


  render() {
    return (
      <div className="App">
          <div className="top">
              <Clock/>
          </div>
          <div className="middle">
              <Weather/>
          </div>
          <div className="bottom">
              Bottom
          </div>
      </div>
    );
  }
}

export default App;
