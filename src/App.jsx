import { useEffect, useState } from 'react';
import { Card } from './components/Card';
import './App.css'


function App() {
  const [characters, setCharacters] = useState([]);

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
      
      console.log(characters);
      setCharacters(characters);
      } catch (error) {
          console.error("Error retrieving characters:", error);
      }
    }
    getCharacters();
  }, []);


  return (
    <>
      <h1>Memory Card Game</h1>
      <div className='game-container'>
        {characters.map((character) => (
          <Card key={character.id} character={character} />
         ))}
      </div>
    </>
  )
}

export default App
