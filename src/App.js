import React, { Component } from 'react';
import './App.css';
import GameContainer from './containers/GameContainer'
import ScoreContainer from './containers/ScoreContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameContainer />
        <ScoreContainer />
      </div>
    );
  }
}

export default App;
