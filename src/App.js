import { useState } from 'react';

export default function Game() {
  
  function handlePlay() {
  }

  let gameOver = false; // set in handlePlay
  let message = "Guess another word!"
  if (gameOver) {
    let didWin = true; // set in handlePlay
    message = didWin ? "You won!" : "You lost :("
  }

  return (
    <div className="game">
      <text className="announcement">{message}</text>
      <div className="game-board">
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  )
}

function Row() {

  return (
    <div className='row'>
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
  )
}

function Square() {

  return (
    <input className='square' type="text" maxlength="1" />
  )
}