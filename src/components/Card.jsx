// To add:
    // Onclick prop


function Card({ character }) {

    return (
        <div className='card'>
            <div className='image-container'>
                <img className='character-image' src={character.image}></img>
            </div>
            <div className="name-container">
                <p className='character-name'>
                    {character.name}
                </p>
            </div>
        </div>
    )
};

export { Card }