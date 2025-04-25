import { useEffect, useState } from 'react';
import { Card, CardBack } from './components/Card';
import { CardFlip } from './components/CardFlip';
import { EndGameModal } from './components/EndGameModal';
import './App.css'

function App() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewBest, setIsNewBest] = useState(false);
  const [endGame, setEndGame] = useState(false);

  function shuffleCards(cards) {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function handleEndGame() {
    setBestScore(prev => Math.max(score, prev));
    setIsNewBest(score > bestScore);
    setEndGame(true);
  }

  function startNewGame() {
    setSelectedCards([]);
    setScore(0);
    setEndGame(false);
    setShuffledCards(prev => shuffleCards(prev));
    setIsFlipped(true); 
    setTimeout(() => {
      setIsFlipped(false);
    }, 500);
  }

  useEffect(() => {
    async function getCharacters() {
      try {
          const response = await fetch(
              'https://api.jikan.moe/v4/anime/21/characters',
              {
                  method: 'GET',
              },
      );
      const json = await response.json();
      const characters = json.data.map(entry => ({
        name: entry.character.name,
        image: entry.character.images.jpg.image_url,
        id: entry.character.mal_id,
      }))
      .filter(character => !character.image.includes("questionmark")); // Filter out characters without an image

      setAllCharacters(characters);

      const initial12 = [
        ...characters.slice(0, 10),
        characters[59],
        characters[151],
      ];

      setShuffledCards(shuffleCards(initial12));
      } catch (error) {
          console.error("Error retrieving characters:", error);
      }
    }
    getCharacters();
  }, []);

  const handleClick = (character) => {
    if (endGame) return;

    if (selectedCards.includes(character.id)) {
      handleEndGame();
      return;
    }

    setSelectedCards(prev => [...prev, character.id]);
    setScore(prev => prev + 1);
    setIsFlipped(true); 
    setTimeout(() => {
      setIsFlipped(false);
    }, 500);
    setShuffledCards(prev => shuffleCards(prev));
  }

  function getRandomCharacters(sourceArray, count) {
    const copied = [...sourceArray];
    for (let i = copied.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }
    console.log(copied.slice(0,count));
    return copied.slice(0, count);
    
  }

  return (
    <>
      <div className="top">
        <h1>One Piece Memory Game</h1>
        <p>Get points by clicking on an image, <br></br>but don't click on any more than once!</p>
        <button
          className="randomize-btn"
          onClick={() => {
            const random12 = getRandomCharacters(allCharacters, 12);
            setShuffledCards(shuffleCards(random12));
          }}>
          Play With New Characters
        </button>
        <div className='score'>
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
        </div>
      </div>
      <div className="centered-content">
        <div className='game-container'>
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
          startNewGame={startNewGame}
          score={score}
          bestScore={bestScore}
          isNewBest={isNewBest}
        />
      )}
      </div>
    </>
  )
}

export default App
