import { useEffect, useState } from 'react';
import { Card, CardBack } from './components/Card';
import './App.css'


function App() {
  const [flipped, setFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState([]);

  function shuffleCards(cards) {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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
      const characters = [
        ...json.data.slice(0, 10),
        json.data[60],
        json.data[154],
      ].map(entry => {
        return {
          name: entry.character.name,
          image: entry.character.images.jpg.image_url,
          id: entry.character.mal_id,
        };
      });
      setShuffledCards(shuffleCards(characters));
      } catch (error) {
          console.error("Error retrieving characters:", error);
      }
    }
    getCharacters();
  }, []);

  const handleClick = () => {
    setFlipped(true);
    setShuffledCards(prev => shuffleCards(prev));
    setTimeout(
      setTimeout(() => setFlipped(false), 1000)
    )
  }

  return (
    <>
      <h1>Memory Card Game</h1>
      <div className='game-container'>
        {
          !flipped ? (
            shuffledCards.map((character) => (
             <Card 
               key={character.id} 
               character={character} 
               handleClick={handleClick}
             />
            ))
        ) : (
          shuffledCards.map((character) => (
            <CardBack key={character.id}/>
          ))
        )
      }
      </div>
    </>
  )
}

export default App
