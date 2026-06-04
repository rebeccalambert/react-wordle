import { useState, useEffect } from 'react';

const SECRET_WORD = "guess" // TODO: get random word from file 
const WORD_LENGTH = 5
const GUESS_LENGTH = 6

export default function Game() {
  const [announcement, setAnnouncement] = useState('Guess another word!');
  const [activeRow, setActiveRow] = useState(0); // index of active row
  const [guessedWords, setGuessedWords] = useState(new Array(GUESS_LENGTH).fill(new Array(WORD_LENGTH).fill(' ')));
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(new Array(WORD_LENGTH).fill(' '));
  const [gameOver, setGameOver] = useState(false);

      
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentLetterIndex, currentWord, activeRow]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleEnter();
    } else if (e.key === 'Backspace') {
      handleBackspace();
    } else if ('abcdefghijklmnopqrstuvwxyz'.includes(e.key)) {
      handleLetter(e.key);
    }
  }

  function handleEnter() {
    if (currentLetterIndex < WORD_LENGTH) return;

    if (currentWord.join("") === SECRET_WORD) {
      setAnnouncement("You won!");
      setGameOver(true);
    } else if (activeRow === GUESS_LENGTH - 1) {
      setAnnouncement("You lost :("); 
      setGameOver(true);
    } else {
      const guessedWordsListCopy = [...guessedWords];
      guessedWordsListCopy[activeRow] = currentWord;
      
      setGuessedWords(guessedWordsListCopy)
      setCurrentWord(new Array(WORD_LENGTH).fill(" "))
      setActiveRow(activeRow => activeRow + 1); 
      setCurrentLetterIndex(0)
    }
  }

  function handleLetter(letter) {
    if (currentLetterIndex >= WORD_LENGTH) return;

    const currentWordCopy = [...currentWord];
    currentWordCopy[currentLetterIndex] = letter;

    setCurrentWord(currentWordCopy);
    setCurrentLetterIndex(currentLetterIndex => currentLetterIndex + 1);
  }

  function handleBackspace() {
    if (currentLetterIndex === 0) return;

    const currentWordCopy = [...currentWord];
    currentWordCopy[currentLetterIndex - 1] = ' ';

    setCurrentWord(currentWordCopy);
    setCurrentLetterIndex(currentLetterIndex => currentLetterIndex - 1);
  }

  function replayGame() {
    setAnnouncement('Guess another word!');
    setActiveRow(0)
    setGuessedWords(new Array(GUESS_LENGTH).fill(new Array(WORD_LENGTH).fill(' ')));
    setCurrentLetterIndex(0);
    setCurrentWord(new Array(WORD_LENGTH).fill(' '));
    setGameOver(false);
  }

  return (
    <div className="game">
      <p className="announcement">{announcement}</p>
      <div className="game-board">
        {guessedWords.map((word, i) => {
          if (activeRow == i) {
            return (
              <Row word={currentWord} isActive={true} />
            )
          } else {
            return (
              <Row word={word} isActive={false} />
            )
          }
        })}
      </div>
        {gameOver && <button onClick={replayGame}>Replay?</button>}
    </div>
  )
}

function Row({word, isActive}) {
  return (
    <div className={`row ${isActive && "active"}`}>
      {word.map((letter, i) => {
        return (
          <Square index={i} letter={letter} isActive={isActive} />
        )
      })}
    </div>
  )
}

function Square({letter, isActive, index}) {
  let color;
  if (!isActive) {
    if (SECRET_WORD[index] == letter) {
      color = 'correct'
    } else if (SECRET_WORD.includes(letter)) {
      color = 'almost'
    } else if (letter !== " ") {
      color = 'wrong'
    }
  }

  return (
    <div className={`square ${color}`}>{letter}</div>
  )
}