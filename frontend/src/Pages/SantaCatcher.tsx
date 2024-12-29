import React, { useState } from 'react';
import GameArea from './GameArea'; // Adjust the import path if necessary

const SantaCatcher: React.FC = () => {
  const [score, setScore] = useState(0); // State to track the score

  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #87ceeb, #ffffff)', // Sky and snow background
        padding: '20px',
        fontFamily: '"Arial", sans-serif',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          fontFamily: '"Mountains of Christmas", serif',
          color: '#ff5555',
          fontSize: '3rem',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        }}
      >
        Santa Catcher Game
      </h1>
      <p
        style={{
          textAlign: 'center',
          margin: '20px',
          maxWidth: '600px',
          fontSize: '1.2rem',
          color: '#333',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '15px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        Santa's sleigh hit some unexpected turbulence, and he tumbled out, landing safely in a magical forest! 
        However, his magical sack of presents also spilled, and now gifts are falling from the sky. Help Santa 
        catch as many presents as possible before they disappear into the snow. Save Christmas for all the children!
      </p>
      <GameArea score={score} setScore={setScore} />
      <div
        style={{
          textAlign: 'center',
          marginTop: '20px',
          fontFamily: '"Arial", sans-serif',
          fontSize: '1.5rem',
          color: '#006400',
        }}
      >
        <p>Score: <strong>{score}</strong></p>
      </div>
    </div>
  );
};

export default SantaCatcher;
