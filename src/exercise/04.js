// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board() {
  // 🐨 squares is the state for this component. Add useState for squares
  // const [squares, setSquares] = React.useState(Array(9).fill(null))

  // store the game state in local storage
  // const [squares, setSquares] = React.useState(
  //   () => {window.localStorage.getItem('squares') || Array(9).fill(null)}

  // const [squares, setSquares] = React.useState(
  //   () =>
  //     JSON.parse(window.localStorage.getItem('squares')) || Array(9).fill(null),
  // )

  // store game state in local storage
  // React.useEffect(() => {
  //   const storedSquares = window.localStorage.getItem('squares')
  //   if (storedSquares) {
  //     setSquares(JSON.parse(storedSquares))
  //   }
  // }, [squares])

  // use the custom hook
  const [squares, setSquares] = useLocalStorageState(
    'squares',
    Array(9).fill(null),
  )

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (winner || squares[square]) {
      return
    }

    const squaresCopy = [...squares]

    // 🐨 set the value of the square that was selected
    squaresCopy[square] = nextValue

    // 🐨 set the squares to your copy
    setSquares(squaresCopy)
  }

  function restart() {
    // 🐨 reset the squares
    setSquares(Array(9).fill(null))
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App

/// storing game history //////////////////////
// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

// import * as React from 'react'
// import {useLocalStorageState} from '../utils'

// function Board({renderSquare, status}) {
//   return (
//     <div>
//       <div className="status">{status}</div>
//       <div className="board-row">
//         {renderSquare(0)}
//         {renderSquare(1)}
//         {renderSquare(2)}
//       </div>
//       <div className="board-row">
//         {renderSquare(3)}
//         {renderSquare(4)}
//         {renderSquare(5)}
//       </div>
//       <div className="board-row">
//         {renderSquare(6)}
//         {renderSquare(7)}
//         {renderSquare(8)}
//       </div>
//     </div>
//   )
// }

// function Game() {
//   const [squares, setSquares] = useLocalStorageState(
//     'squares',
//     Array(9).fill(null),
//   )

//   // const [history, setHistory] = React.useState([squares])
//   const history = [squares]
//   const currentStep = 0

//   const nextValue = calculateNextValue(squares)
//   const winner = calculateWinner(squares)
//   const status = calculateStatus(winner, squares, nextValue)

//   function selectSquare(square) {
//     if (winner || squares[square]) {
//       return
//     }

//     const squaresCopy = [...squares]
//     squaresCopy[square] = nextValue
//     setSquares(squaresCopy)
//   }

//   function restart() {
//     setSquares(Array(9).fill(null))
//   }

//   function renderSquare(i) {
//     return (
//       <button className="square" onClick={() => selectSquare(i)}>
//         {squares[i]}
//       </button>
//     )
//   }
//   React.useEffect(() => {
//     console.log(squares, 'squares')
//     console.log(history)
//   }, [squares, history])

//   const moves = history.map((move, index) => {
//     return <button key={index}> Go to move {move}</button>
//   })

//   // function moves ({squares, index}){
//   //   return (
//   //       {squares.map((square, index) => (
//   //         <li key={index}>{square} moved here</li>
//   //       ))}
//   //   )
//   // }

//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board
//           onClick={selectSquare}
//           squares={squares}
//           renderSquare={renderSquare}
//         />
//         <button className="restart" onClick={restart}>
//           restart
//         </button>
//       </div>
//       <div className="game-info">
//         <div>{status}</div>
//         {/* <ol>{moves}</ol> */}
//       </div>
//     </div>
//   )
// }

// function calculateStatus(winner, squares, nextValue) {
//   return winner
//     ? `Winner: ${winner}`
//     : squares.every(Boolean)
//     ? `Scratch: Cat's game`
//     : `Next player: ${nextValue}`
// }

// function calculateNextValue(squares) {
//   return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ]
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i]
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a]
//     }
//   }
//   return null
// }

// function App() {
//   return <Game />
// }

// export default App
