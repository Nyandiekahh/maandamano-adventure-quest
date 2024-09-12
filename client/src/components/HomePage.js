import React, { useState } from 'react';

const HomePage = () => {
    const [players, setPlayers] = useState([]);
    // Removed unused selectedCharacter variable

    const handleStartGame = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/players'); // URL to your Flask API
            const data = await response.json();
            setPlayers(data);
            console.log(data); // You can remove this after testing
        } catch (error) {
            console.error("Error fetching players:", error);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#1e1e2e', color: '#ffffff', minHeight: '100vh' }}>
            <h1>Welcome back, testuser!</h1>
            <p>Game Overview: In this game, you will navigate through various protest scenarios, choosing your role and making decisions that will impact the story's outcome.</p>
            <div>
                <button 
                    onClick={handleStartGame}
                    style={{ padding: '1rem', backgroundColor: '#f39c12', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}
                >
                    Start Game
                </button>
            </div>

            {/* Display player cards once data is fetched */}
            {players.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                    {players.map(player => (
                        <div key={player.id} style={cardStyle}>
                            <h2 style={{ color: '#f39c12' }}>{player.name}</h2>
                            <p><strong>Strengths:</strong> {player.strengths}</p>
                            <p><strong>Weaknesses:</strong> {player.weaknesses}</p>
                            <p><strong>Equipment:</strong> {player.equipment}</p>
                            {/* <p><strong>Score:</strong> {player.score}</p> */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Styling for the card
const cardStyle = {
    backgroundColor: '#2e2e3e',
    color: '#ffffff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'left',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer'
};

export default HomePage;
