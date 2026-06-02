import { useState } from 'react';

export default function Game() {
  const [history, setHistory] = useState([Array(5).fill(null)]);

  function handlePlay(nextSquares) {
  }

  return (
    <div className="game">
      <div className="game-board">
        board
      </div>
      <div className="game-info">
        info
      </div>
    </div>
  )
}
