// src/components/ScoreBoard.js
import React from 'react';
import './ScoreBoard.css'; // Optional: create a CSS file for styling

const ScoreBoard = ({ score }) => {
    return (
        <div className="score-board">
            <h2>Current Score</h2>
            <div className="score">{score}</div>
        </div>
    );
};

export default ScoreBoard;
