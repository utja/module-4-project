import React from 'react'
import Score from '../components/score/Score'

const SCORESAPI = 'http://localhost:3000/api/v1/scores'

class ScoreContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      scores: '',
      loading: true
    }
  }

  componentDidMount(){
    fetch(SCORESAPI).then(r => r.json()).then(data =>
    this.setState({scores: data, loading:false}))
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props !== prevProps) {
      fetch(SCORESAPI).then(r => r.json()).then(data =>
      this.setState({scores: data, loading:false}))
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
    // if(this.props.gameState !== nextProps.gameState){
    //   true
    // }
  // }

  // map through data, create <Score />
  sortScores = () => {
    // debugger
    let sortedScores = this.state.scores.sort(function(a, b){return b.score-a.score})
    let topTwenty = sortedScores.slice(0, 20)
    let topScores = topTwenty.map(score => {
      return <Score key={score.id} score={score}/>
    })
    return topScores
  }

  render() {
    if (this.state.loading){
      return (

        <div className="scorecontainer four wide column">
          <h1>LOADING SCORES</h1>
        </div>
      )
    } else {
      let scores = this.sortScores()
      return (
        <div className="scorecontainer four wide column">
          <table className="ui teal table">
            <thead>
              <tr>
                <th className="center aligned" colspan="2">High Scores</th>
              </tr>
              <tr>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {scores}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default ScoreContainer
