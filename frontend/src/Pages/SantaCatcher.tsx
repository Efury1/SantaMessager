import React, { useState } from 'react';
import '../Styles/Styling.css'; // Import the CSS file
import GameArea from './GameArea'; // Adjust the import path if necessary

const SantaCatcher: React.FC = () => {
  const [score, setScore] = useState(0); // State to track the score

  return (
    <div className="santa-catcher-container">
      <h1 className="santa-catcser-title">Santa Catcher Game</h1>
      <p className="santa-catcher-description">
        Santa's sleigh hit some unexpected turbulence, and he tumbled out, landing safely in a magical forest! 
        However, his magical sack of presents also spilled, and now gifts are falling from the sky. Help Santa 
        catch as many presents as possible before they disappear into the snow. Save Christmas for all the children!
      </p>
      <GameArea score={score} setScore={setScore} />
      <div className="santa-catcher-score">
        <p>
          Score: <strong>{score}</strong>
        </p>
      </div>
    </div>
  );
};

export default SantaCatcher;
