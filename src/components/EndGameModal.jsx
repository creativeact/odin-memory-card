function EndGameModal({ startNewGame, score, bestScore, isNewBest }) {
    
    return(
        <div className="modal">
            {isNewBest ? (
            <p>🎉 Congrats! New best score: {score}</p>
            ) : (
            <>
                <p>Good try! You scored {score}</p>
                <p>Your Best Score is {bestScore}</p>
            </>
            )}
            <button onClick={startNewGame}>Try Again</button>
      </div>
    )
}

export { EndGameModal }