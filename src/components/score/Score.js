import React from 'react'


const Score = (props) => {
  // console.log('score props', props)

  return(
    <h1>{props.score.user.name}: {props.score.score}</h1>
  )
}

export default Score
