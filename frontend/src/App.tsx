import React, { useState, useEffect } from 'react';
import { Button } from './Components/Card/Buttons'; // Ensure this path is correct
import { FaGift } from 'react-icons/fa';
import './Styles/Styling.css';
import { useNavigate } from 'react-router-dom';
import CuteSanta from './CuteSanta.jpg';
import { Snowfall } from 'react-snowfall';


const App: React.FC = () => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const christmas = new Date(now.getFullYear(), 11, 25); // December 25th
      if (now.getMonth() === 11 && now.getDate() > 25) {
        christmas.setFullYear(now.getFullYear() + 1); // Next year's Christmas
      }
      const timeDifference = christmas.getTime() - now.getTime();
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  function handleButtonClick(): void {
    navigate('/write-letter');
  }

  function handleSantaCatcher(): void {
    navigate('/santa-catcher');
  }

  return (
    <div className="santa-container">
      <Snowfall snowflakeCount={100} color="white" />
      <h1 className="dear-santa">Dear Santa...</h1>
      <img src={CuteSanta} alt="Santa Clause" className="santa-image" />
      <div className="countdown">
        <p className="countdown-text">
          There are only{' '}
          <span className="countdown-number">{timeRemaining.days}</span> days{' '}
          <span className="countdown-number">{timeRemaining.hours}</span> hours{' '}
          <span className="countdown-number">{timeRemaining.minutes}</span> mins{' '}
          <span className="countdown-number">{timeRemaining.seconds}</span> secs
          until Christmas!
        </p>
      </div>
      <Button
        label={
          <>
            <FaGift /> Write a Letter to Santa
          </>
        }
        ariaLabel="Write Santa a Letter"
        style={{ backgroundColor: 'red', color: 'white' }}
        onClick={handleButtonClick}
      />


        <Button
        label={
          <>
            <FaGift /> Play Santa Catcher
          </>
        }
        ariaLabel="Play Santa Catcher"
        style={{ backgroundColor: 'red', color: 'white' }}
        onClick={handleSantaCatcher}
      />
      
    </div>
  );
};

export default App;
