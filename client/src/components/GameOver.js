import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GameOver.css';

const GameOver = () => {
    const navigate = useNavigate();

    const handleRestart = () => {
        navigate('/'); // Navigate back to the WelcomeScreen for a restart
    };

    return (
        <div className="game-over">
            <h1>Game Over</h1>
            <p>Your score went negative. The game is over.</p>
            <button onClick={handleRestart}>Restart Game</button>
        </div>
    );
};

export default GameOver;
