// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { useLocalStorageState } from '../utils'

function Steps({ history, currentStep, onGoBack }) {
  return (
    <ol>
      {history.map((_, step) => (
        <li key={step}>
          <button
            disabled={step === currentStep}
            onClick={() => onGoBack(step, history)}
          >
            {step === 0 ? `Go to game start` : `Go to move #${step} `}
            {step === currentStep && '(current)'}
          </button>
        </li>
      ))}
    </ol>
  )
}

function Board({ squares, onClick }) {
  function selectSquare(square) {
    onClick(square)
  }

  function renderSquare(i, square) {
    return (
      <button
        className="square"
        onClick={() => selectSquare(i)}
      >
        {square}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0, squares[0])}
        {renderSquare(1, squares[1])}
        {renderSquare(2, squares[2])}
      </div>
      <div className="board-row">
        {renderSquare(3, squares[3])}
        {renderSquare(4, squares[4])}
        {renderSquare(5, squares[5])}
      </div>
      <div className="board-row">
        {renderSquare(6, squares[6])}
        {renderSquare(7, squares[7])}
        {renderSquare(8, squares[8])}
      </div>
    </div>
  )
}

function Game() {
  const [currentStep, setCurrentStep] = useLocalStorageState('tic-tac-toe:step', 0);
  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [Array(9).fill(null)]);

  const currentSquares = history[currentStep];
  const nextValue = calculateNextValue(currentSquares);
  const winner = calculateWinner(currentSquares);
  const status = calculateStatus(winner, currentSquares, nextValue);

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  }

  function handleSquaresChange(square, squaresArg, winnerArg, currentStepArg, nextValueArg) {
    if (!winnerArg && !squaresArg[square]) {
      const newHistory = history.slice(0, currentStep + 1);
      const newSquares = squaresArg.map((value, index) =>
        index === square
          ? nextValueArg
          : value
      );
      setHistory([...newHistory, newSquares]);
      setCurrentStep(newHistory.length);
    }
  }

  function handleGoBack(index) {
    setCurrentStep(index);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquares}
          onClick={(square) => handleSquaresChange(square, currentSquares, winner, currentStep, nextValue)}
        />
        <button
          className="restart"
          onClick={restart}
        >
          restart
      </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <Steps
          history={history}
          currentStep={currentStep}
          onGoBack={handleGoBack}
        />
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
      ? `Scratch: Cat's game`
      : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

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
