import React, { useState, useEffect } from 'react';
import '../Styles/Styling.css'; // Import the CSS file
import SantaLeftImg from '../Assets/SantaLeft.jpg';
import SantaImg from '../Assets/Santa.jpg'; // Import Santa image asset
import BasketImg from '../Assets/Basket.jpg'; // Import Basket image asset

interface GameAreaProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const GameArea: React.FC<GameAreaProps> = ({ score, setScore }) => {
  const [santaLeft, setSantaLeft] = useState(150);
  const [santaDirection, setSantaDirection] = useState<'left' | 'right' | 'up'>('right');
  const [baskets, setBaskets] = useState([{ top: 0, left: Math.random() * 350 }]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [santaTop, setSantaTop] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  
  const moveDown = () => {
  }


  const triggerJump = () => {
    setIsJumping(true);
    const jumpHeight = 100; // How high Santa should jump
    const jumpSpeed = 5; // How fast Santa should jump

    // Move Santa up
    const upInterval = setInterval(() => {
       setSantaTop((prev) => {
        if (prev <= 300 - jumpHeight) {
          clearInterval(upInterval); // Stop moving up
          moveDown(); // Move Santa down
          return prev;
        }
        return prev - 5; 
       });
    }, jumpSpeed);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      setSantaLeft((prev) => Math.min(prev + 20, 300));
      setSantaDirection('right');
    } else if (e.key === 'ArrowLeft') {
      setSantaLeft((prev) => Math.max(prev - 20, 0));
      setSantaDirection('left');
    } else if (e.key === 'ArrowUp' && !isJumping) {
      triggerJump();
    }
  };

  const checkCollision = (basket: { top: number; left: number }) => {
    const spriteSize = 100;
    const santaX = santaLeft;
    const basketX = basket.left;
    const basketY = basket.top;
    const santaBottomY = 300;

    return (
      santaX < basketX + spriteSize &&
      santaX + spriteSize > basketX &&
      santaBottomY < basketY + spriteSize &&
      santaBottomY + spriteSize > basketY
    );
  };

  const resetGame = () => {
    setScore(0);
    setBaskets([{ top: 0, left: Math.random() * 350 }]);
    setSantaLeft(150);
    setGameOver(false);
    setGameStarted(false);
  };

  const updateBaskets = () => {
    setBaskets((prevBaskets) =>
      prevBaskets.map((basket) => {
        if (basket.top > 400) {
          setGameOver(true);
          return { top: 0, left: Math.random() * 350 };
        }

        const newPosition = { ...basket, top: basket.top + 5 };

        if (checkCollision(basket)) {
          setScore((prevScore) => {
            const newScore = prevScore + 1;
            if (newScore % 20 === 0) {
              setBaskets((currentBaskets) => [
                ...currentBaskets,
                { top: 0, left: Math.random() * 350 },
              ]);
            }
            return newScore;
          });
          return { top: 0, left: Math.random() * 350 };
        }

        return newPosition;
      })
    );
  };

  useEffect(() => {
    if (gameOver || !gameStarted) return;

    const interval = setInterval(updateBaskets, 50);

    return () => clearInterval(interval);
  }, [baskets, gameOver, gameStarted]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setBaskets([{ top: 0, left: Math.random() * 350 }]);
    setSantaLeft(150);
  };

  return (
    <div className="game-area-container">
      {!gameStarted && (
        <div className="start-screen">
          <p className="instructions">
            Use the <strong>Arrow Left</strong> and <strong>Arrow Right</strong>{' '}
            keys to move Santa. Catch the baskets and score points. If you miss
            a basket, the game is over!
          </p>
          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
        </div>
      )}
      {gameOver && <div className="game-over-message">Game Over! Final Score: {score}</div>}
      {gameStarted && !gameOver && (
        <img
          className="sprite"
          src={santaDirection === 'right' ? SantaImg : SantaLeftImg}
          style={{ left: santaLeft, bottom: 20 }}
          alt="Santa"
        />
      )}
      {gameStarted &&
        !gameOver &&
        baskets.map((basket, index) => (
          <img
            key={index}
            className="sprite"
            src={BasketImg}
            style={{ top: basket.top, left: basket.left }}
            alt="Basket"
          />
        ))}
    </div>
  );
};

export default GameArea;
