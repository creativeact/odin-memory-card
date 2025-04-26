import { useEffect, useState } from 'react';

function EndGameModal({ show, startNewGame, score, isNewBest }) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(show);
    }, [show]);

    return(
        <div className={`modal ${showModal ? 'show' : ''}`}>
            <div className="modal-content">
            {isNewBest ? (
                <>
                    <p className='modal-header'>Game Over</p>
                    <img className='modal-img'src='./src/assets/One-Piece-Celebration.jpg'></img>
                    <p>🎉 Congrats! You got a new best score: {score}</p>
                </>
                ) : (
                <>
                    <p className='modal-header'>Game Over</p>
                    <img className='modal-img'src='./src/assets/One-Piece-Luffy-Crying.jpg'></img>
                    <p>You scored: {score}</p>
                </>
                )}
                <button onClick={startNewGame}>Try Again</button>
            </div>
      </div>
    )
}

export { EndGameModal }