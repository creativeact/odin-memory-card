import { useState, useEffect } from "react";

function CardFlip({ isFlipped, front, back }) {
  const [cardFlipped, setCardFlipped] = useState(false);

  useEffect(() => {
    setCardFlipped(isFlipped);
  }, [isFlipped]);

  return (
    <div className="card-flip">
      <div className={`card-inner ${cardFlipped ? "flipped" : ""}`}>
        <div className="card-front">{front}</div>
        <div className="card-back-face">{back}</div>
      </div>
    </div>
  );
}

export { CardFlip };
