import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import Weather from './Weather';

class App extends Component {


  render() {
    return (
      <div className="App">
          <Clock/>
          <Weather/>
      </div>
    );
  }
}

export default App;
