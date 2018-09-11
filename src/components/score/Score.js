import React from 'react'


const Score = (props) => {
  // console.log('score props', props)

  return(
      <tr>
        <td>{props.score.user.name}</td>
        <td>{props.score.score}</td>
      </tr>
  )
}

export default Score
