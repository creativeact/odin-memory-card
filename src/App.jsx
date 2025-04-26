import { useEffect, useState } from "react";
import { Card, CardBack } from "./components/Card";
import { CardFlip } from "./components/CardFlip";
import { EndGameModal } from "./components/EndGameModal";
import { shuffleCards } from "./utils/shuffleCards.js";
import { getRandomCharacters } from "./utils/getRandomCharacters.js";
import { fetchCharacters } from "./utils/fetchCharacters.js";
import OnePieceLogo from './assets/one-piece-logo.png';
import "./App.css";

function App() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchCharacters(setAllCharacters, setShuffledCards);
  }, []);

  function startNewGame() {
    setSelectedCards([]);
    setScore(0);
    setEndGame(false);
    setShow(false);
    setShuffledCards((prev) => shuffleCards(prev));
    setIsFlipped(true);
    setTimeout(() => {
      setIsFlipped(false);
    }, 500);
  }

  function handleEndGame() {
    setBestScore((prev) => Math.max(score, prev));
    setIsNewBest(score > bestScore);
    setEndGame(true);
    setShow(true);
  }

  const handleClick = (character) => {
    if (endGame) return;

    if (selectedCards.includes(character.id)) {
      handleEndGame();
      return;
    }

    setSelectedCards((prev) => [...prev, character.id]);
    setScore((prev) => prev + 1);
    setIsFlipped(true);
    setTimeout(() => {
      setIsFlipped(false);
    }, 500);
    setShuffledCards((prev) => shuffleCards(prev));
  };

  return (
    <>
      <div className="top">
        <div className="game-header">
          <img
            className="game-logo"
            src={OnePieceLogo}
          ></img>
          <h1 className="game-title">One Piece Memory Game</h1>
        </div>
        <p className='game-desc'>
          Get points by clicking on an image, <br></br>but don't click on any
          more than once!
        </p>
        <button
          className="randomize-btn"
          onClick={() => {
            const random12 = getRandomCharacters(allCharacters, 12);
            setShuffledCards(shuffleCards(random12));
          }}
        >
          Play With New Characters
        </button>
        <div className="score">
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </div>
      <div className="centered-content">
        <div className="game-container">
          {shuffledCards.map((character) => (
            <CardFlip
              key={character.id}
              isFlipped={isFlipped}
              front={<Card character={character} handleClick={handleClick} />}
              back={<CardBack />}
            />
          ))}
        </div>
        {endGame && (
          <EndGameModal
            show={show}
            startNewGame={startNewGame}
            score={score}
            isNewBest={isNewBest}
          />
        )}
      </div>
    </>
  );
}

export default App;
