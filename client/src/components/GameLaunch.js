import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import StorylineCard from './StorylineCard'; // Import your StorylineCard component

const GameLaunch = () => {
    const location = useLocation();
    const { selectedCharacter } = location.state || {}; // Ensure the correct key is used
    const [randomLocation, setRandomLocation] = useState(null);
    const [randomEvent, setRandomEvent] = useState(null);

    useEffect(() => {
        const fetchRandomLocationAndEvent = async () => {
            try {
                const locationResponse = await fetch('http://127.0.0.1:5000/random-location');
                const eventResponse = await fetch('http://127.0.0.1:5000/random-event');
                const locationData = await locationResponse.json();
                const eventData = await eventResponse.json();

                setRandomLocation(locationData);
                setRandomEvent(eventData);
            } catch (error) {
                console.error("Error fetching location and event:", error);
            }
        };

        fetchRandomLocationAndEvent();
    }, []);

    if (!selectedCharacter) {
        return <p>No character selected.</p>;
    }

    return (
        <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#1e1e2e', color: '#ffffff', minHeight: '100vh' }}>
            <h1>Game Launch</h1>
            <p>You have selected: <strong>{selectedCharacter.name}</strong></p>
            <p><strong>Strengths:</strong> {selectedCharacter.strengths}</p>
            <p><strong>Weaknesses:</strong> {selectedCharacter.weaknesses}</p>
            <p><strong>Equipment:</strong> {selectedCharacter.equipment}</p>

            {randomLocation && (
                <div>
                    <h2>Location</h2>
                    <p><strong>Name:</strong> {randomLocation.name}</p>
                    <p><strong>Description:</strong> {randomLocation.description}</p>
                </div>
            )}

            {randomEvent && (
                <div>
                    <h2>Event</h2>
                    <p><strong>Description:</strong> {randomEvent.description}</p>
                </div>
            )}

            {/* Add the Storyline trivia section */}
            <div style={{ marginTop: '2rem' }}>
                <h2>Storyline Trivia</h2>
                <StorylineCard character={selectedCharacter.name} /> {/* Pass the selected character's name */}
            </div>
        </div>
    );
};

export default GameLaunch;
