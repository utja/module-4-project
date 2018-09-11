import React from 'react'
import Game from '../components/game/Game'

const SCORESAPI = 'http://localhost:3000/api/v1/scores'

class GameContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      level: 'start',
      score: 0
    }
  }

  // this.game.cache.getText('level')

  // componentDidMount(){
  //   this.setState({level: 'start', score: 0})
  // }

  gameOver = (score) => {
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({score: score, user_id: 1})
    }
    fetch(SCORESAPI, config).then(r => r.json())

  }

  shouldComponentUpdate() {
    return false
  }

  render(){
    switch (this.state.level) {
      case 'start':
        return (
          <div className="gamecontainer">
            <Game gameOver={this.gameOver} changeGameState={this.props.changeGameState} />
            {/* <Game /> */}
          </div>
        )
        break
      case 'gameOver':
        return (
          <div className="gamecontainer">
            <h1>Score: {this.state.score}</h1>
            <button onClick={this.startGame}>Play Again</button>
          </div>
        )
        break
      default:
        break
    }
  }
}

export default GameContainer
