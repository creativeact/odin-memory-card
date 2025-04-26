import cardBackImage from '../assets/one-piece-logo.png';

function Card({ character, handleClick }) {
  return (
    <div className="card" onClick={() => handleClick(character)}>
      <div className="image-container">
        <img className="character-image" src={character.image}></img>
      </div>
      <div className="name-container">
        <p className="character-name">{character.name}</p>
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div className="card-back">
      <img className="back-img" src={cardBackImage}></img>
    </div>
  );
}

export { Card, CardBack };
