import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './WelcomeScreen';
import HomePage from './HomePage';
import GameLaunch from './GameLaunch';

const App = () => {
    // Example player name for demonstration purposes
    const playerName = "PlayerOne";

    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomeScreen />} />
                <Route path="/homepage" element={<HomePage playerName={playerName} />} />
                <Route path="/game-launch" element={<GameLaunch />} />

                {/* Add routes for other pages */}
            </Routes>
        </Router>
    );
};

export default App;
