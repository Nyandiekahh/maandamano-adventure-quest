import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScoreBoard.css'; // Optional: create a CSS file for styling

const ScoreBoard = ({ score }) => {
    const navigate = useNavigate();

    // Check for negative score and navigate to Game Over page
    useEffect(() => {
        if (score < 0) {
            navigate('/game-over'); // Redirect to the Game Over page when score is negative
        }
    }, [score, navigate]); // Re-run effect when the score changes

    return (
        <div className="score-board">
            <h2>Current Score</h2>
            <div className="score">{score}</div>
        </div>
    );
};

export default ScoreBoard;
