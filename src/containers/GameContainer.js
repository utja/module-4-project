import React from 'react'
import Game from '../components/game/Game'

class GameContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      level: 'start',
      score: ''
    }
  }

  // this.game.cache.getText('level')

  // componentDidMount(){
  //   this.setState({level: 'start', score: 0})
  // }

  gameOver = (score) => {
    // this.setState({score:score})
  }

  startGame = () => {
    this.setState({level: 'start', score:0}, ()=> console.log(this.state))
  }

  render(){
    switch (this.state.level) {
      case 'start':
        return (
          <div className="gamecontainer">
            <Game gameOver={this.gameOver}/>
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
