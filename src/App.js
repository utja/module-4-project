import React, { Component } from 'react';
import './App.css';
import GameContainer from './containers/GameContainer'
import ScoreContainer from './containers/ScoreContainer'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      gameState: 0
    }
  }

  changeGameState = () => {
    this.setState(prevState => ({gameState: prevState.gameState + 1}),() => console.log(this.state))
  }

  render() {
    return (
      <div className="App">
        <GameContainer changeGameState={this.changeGameState}/>
        <ScoreContainer gameState={this.state.gameState}/>
      </div>
    );
  }
}

export default App;
