import { shuffleCards } from './shuffleCards';

async function fetchCharacters(setAllCharacters, setShuffledCards) {
  try {
    const response = await fetch('https://api.jikan.moe/v4/anime/21/characters');
    const json = await response.json();
    const characters = json.data.map(entry => ({
      name: entry.character.name,
      image: entry.character.images.jpg.image_url,
      id: entry.character.mal_id,
    })).filter(c => !c.image.includes("questionmark"));

    setAllCharacters(characters);
    const initial12 = [
      ...characters.slice(0, 10),
      characters[59],
      characters[151],
    ];
    setShuffledCards(shuffleCards(initial12));
  } catch (err) {
    console.error("Error retrieving characters:", err);
  }
}

export { fetchCharacters }