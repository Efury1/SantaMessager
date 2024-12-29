import React, { useState, useEffect } from 'react';
import styled from 'styled-components'; // Import styled-components for styling
import SantaImg from '../Assets/Santa.jpg'; // Import Santa image asset
import BasketImg from '../Assets/Basket.jpg'; // Import Basket image asset

// Styled component for the game container
const GameAreaContainer = styled.div`
  position: relative; // Allows child elements to be positioned absolutely within this container
  width: 400px; // Set the width of the game area
  height: 400px; // Set the height of the game area
  overflow: hidden; // Prevents elements from overflowing outside the container
  background-color: #eef; // Sets a light background color
  border: 20px solid transparent; // Transparent border for visual padding
  background-origin: border-box; // Ensures the background starts from the border box
  background-clip: content-box, border-box; // Ensures background colors and borders are clipped appropriately
  background-image: 
    linear-gradient(white, white), // Inner white background
    repeating-linear-gradient(45deg, red 0, red 10px, white 10px, white 20px); // Decorative checkered border
`;

// Styled component for the game sprites (Santa and baskets)
const Sprite = styled.img<{ top?: number; left?: number }>`
  width: 100px; // Fixed width for sprites
  height: 100px; // Fixed height for sprites
  position: absolute; // Allows precise positioning of sprites
  bottom: ${(props) => (props.bottom !== undefined ? props.bottom : 'auto')}px; // Set bottom position dynamically
  left: ${(props) => (props.left !== undefined ? props.left : 'auto')}px; // Set left position dynamically
  top: ${(props) => (props.top !== undefined ? props.top : 'auto')}px; // Set top position dynamically
  z-index: ${(props) => props.zIndex || 1}; // Control layering of sprites
`;

// Styled component for displaying the "Game Over" message
const GameOverMessage = styled.div`
  position: absolute; // Centered using absolute positioning
  top: 50%; // Vertically centered
  left: 50%; // Horizontally centered
  transform: translate(-50%, -50%); // Perfect centering using translate
  font-size: 2rem; // Large font size for visibility
  color: red; // Red text to indicate game over
  font-weight: bold; // Bold text
  text-align: center; // Center the text within the container
  z-index: 10; // Ensures this appears on top of other elements
`;

// Styled component for the start screen
const StartScreen = styled.div`
  position: absolute; // Positioned absolutely in the game area
  top: 50%; // Vertically centered
  left: 50%; // Horizontally centered
  transform: translate(-50%, -50%); // Perfect centering
  text-align: center; // Center the text within the container
  z-index: 10; // Displayed above other elements
`;

// Styled component for the instructions text
const Instructions = styled.p`
  font-size: 1rem; // Standard font size
  color: #333; // Dark gray text color
  margin-bottom: 20px; // Spacing below the instructions
`;

// Styled component for the start button
const StartButton = styled.button`
  font-size: 1.2rem; // Slightly larger font for the button
  padding: 10px 20px; // Padding for clickable area
  color: white; // White text color
  background-color: #007bff; // Blue background
  border: none; // No border
  border-radius: 5px; // Rounded corners
  cursor: pointer; // Pointer cursor on hover
  &:hover {
    background-color: #0056b3; // Darker blue on hover
  }
`;

// TypeScript interface for the game area props
interface GameAreaProps {
  score: number; // Current game score
  setScore: React.Dispatch<React.SetStateAction<number>>; // Function to update the score
}

// Main GameArea component
const GameArea: React.FC<GameAreaProps> = ({ score, setScore }) => {
  const [santaLeft, setSantaLeft] = useState(150); // Tracks Santa's horizontal position
  const [baskets, setBaskets] = useState([{ top: 0, left: Math.random() * 350 }]); // Tracks basket positions
  const [gameOver, setGameOver] = useState(false); // Tracks game over state
  const [gameStarted, setGameStarted] = useState(false); // Tracks if the game has started

  // Function to handle Santa's movement based on key presses
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      setSantaLeft((prev) => Math.min(prev + 20, 300)); // Move right within bounds
    } else if (e.key === 'ArrowLeft') {
      setSantaLeft((prev) => Math.max(prev - 20, 0)); // Move left within bounds
    }
  };

  // Function to check for collisions between Santa and a basket
  const checkCollision = (basket: { top: number; left: number }) => {
    const spriteSize = 100; // Both Santa and Basket are 100x100 in size
    const santaX = santaLeft;
    const basketX = basket.left;
    const basketY = basket.top;
    const santaBottomY = 300; // Fixed bottom position for Santa

    // Returns true if Santa and basket overlap
    return (
      santaX < basketX + spriteSize &&
      santaX + spriteSize > basketX &&
      santaBottomY < basketY + spriteSize &&
      santaBottomY + spriteSize > basketY
    );
  };

  // Function to reset the game to its initial state
  const resetGame = () => {
    setScore(0); // Reset score
    setBaskets([{ top: 0, left: Math.random() * 350 }]); // Reset baskets
    setSantaLeft(150); // Reset Santa's position
    setGameOver(false); // Clear game over state
    setGameStarted(false); // Show start screen
  };

  // Function to update basket positions and handle game logic
  const updateBaskets = () => {
    setBaskets((prevBaskets) =>
      prevBaskets.map((basket) => {
        if (basket.top > 400) {
          setGameOver(true); // Set game over if a basket is missed
          return { top: 0, left: Math.random() * 350, caught: false}; // Reset basket position
        }

        const newPosition = { ...basket, top: basket.top + 5 }; // Move basket down

        if (checkCollision(basket)) {
          setScore((prevScore) => {
            const newScore = prevScore + 1; // Increment score on collision
            if (newScore % 20 === 0) {
              // Add a new basket every 20 points
              setBaskets((currentBaskets) => [
                ...currentBaskets,
                { top: 0, left: Math.random() * 350, caught: false },
              ]);
            }
            return newScore;
          });
          return { top: 0, left: Math.random() * 350 }; // Reset basket position
        }

        return newPosition;
      })
    );
  };

  // Interval to update basket positions
  useEffect(() => {
    if (gameOver || !gameStarted) return; // Stop updates if game is over or not started

    const interval = setInterval(updateBaskets, 50); // Update every 50ms

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [santaLeft, baskets, gameOver, gameStarted]);

  // Event listener for keyboard input
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown); // Add listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Cleanup listener
    };
  }, []);

  // Function to start the game
  const startGame = () => {
    setGameStarted(true); // Start the game
    setGameOver(false); // Clear game over state
    setScore(0); // Reset score
    setBaskets([{ top: 0, left: Math.random() * 350 }]); // Reset basket positions
    setSantaLeft(150); // Reset Santa's position
  };

  return (
    <GameAreaContainer>
      {/* Start Screen */}
      {!gameStarted && (
        <StartScreen>
          <Instructions>
            Use the <strong>Arrow Left</strong> and <strong>Arrow Right</strong>{' '}
            keys to move Santa. Catch the baskets and score points. If you miss
            a basket, the game is over!
          </Instructions>
          <StartButton onClick={startGame}>Start Game</StartButton>
        </StartScreen>
      )}

      {/* Game Over Message */}
      {gameOver && <GameOverMessage>Game Over! Final Score: {score}</GameOverMessage>}

      {/* Game Content */}
      {gameStarted && !gameOver && <Sprite src={SantaImg} left={santaLeft} bottom={20} />}
      {gameStarted &&
        !gameOver &&
        baskets.map((basket, index) => (
          <Sprite key={index} src={BasketImg} top={basket.top} left={basket.left} />
        ))}
    </GameAreaContainer>
  );
};

export default GameArea;
