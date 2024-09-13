import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GameLaunch.css'; // Import the CSS file

const GameLaunch = () => {
    const location = useLocation();
    const navigate = useNavigate(); // For navigation to Game Over page
    const { selectedCharacter } = location.state || {};
    const [randomLocation, setRandomLocation] = useState(null);
    const [randomEvent, setRandomEvent] = useState(null);
    const [storyline, setStoryline] = useState(null);
    const [currentChoices, setCurrentChoices] = useState([]);
    const [score, setScore] = useState(0);
    const [situationText, setSituationText] = useState("");

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

        const fetchStoryline = async () => {
            if (selectedCharacter) {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/storylines/${selectedCharacter.name.replace(' ', '%20')}`);
                    const data = await response.json();
                    setStoryline(data);
                    setCurrentChoices(data.choices || []);
                    setSituationText(data.currentSituation || "");
                } catch (error) {
                    console.error('Error fetching storyline:', error);
                }
            }
        };

        fetchRandomLocationAndEvent();
        fetchStoryline();
    }, [selectedCharacter]);

    const handleChoiceSelect = (choice) => {
        // Update the score based on the choice mark
        const newScore = score + choice.mark;
        setScore(newScore);

        // Check if the score has gone below 0
        if (newScore < 0) {
            navigate('/game-over'); // Navigate to the Game Over page if score is negative
            return; // Stop further execution
        }

        // Update the situation text based on the selected choice
        setSituationText(choice.outcome || "");

        // Transition animation
        const choiceElements = document.querySelectorAll('.choice-card');
        choiceElements.forEach(el => el.classList.add('fade-out'));

        // Wait for animation to finish before updating choices
        setTimeout(() => {
            // Fetch next choices
            if (choice.nextChoices) {
                setCurrentChoices(choice.nextChoices);
            } else {
                setCurrentChoices([]); // Clear choices if there are no more options
            }
        }, 500); // Match this timing with your CSS transition duration
    };

    if (!selectedCharacter) {
        return <p>No character selected.</p>;
    }

    return (
        <div className="game-launch-container">
            <h1>Game Launch</h1>

            {/* Card Layout */}
            <div className="card-container">
                <div className="card character-card">
                    <h2>Selected Character</h2>
                    <p><strong>Name:</strong> {selectedCharacter.name}</p>
                    <p><strong>Strengths:</strong> {selectedCharacter.strengths}</p>
                    <p><strong>Weaknesses:</strong> {selectedCharacter.weaknesses}</p>
                    <p><strong>Equipment:</strong> {selectedCharacter.equipment}</p>
                </div>

                {randomLocation && (
                    <div className="card location-card">
                        <h2>Location</h2>
                        <p><strong>Name:</strong> {randomLocation.name}</p>
                        <p><strong>Description:</strong> {randomLocation.description}</p>
                    </div>
                )}

                {randomEvent && (
                    <div className="card event-card">
                        <h2>Event</h2>
                        <p><strong>Description:</strong> {randomEvent.description}</p>
                    </div>
                )}
            </div>

            {/* Storyline trivia section */}
            <div className="storyline-trivia">
                {storyline && (
                    <div>
                        <h2>Storyline Trivia</h2>
                        <p>{situationText}</p>
                        <div className="choices-container">
                            {currentChoices.map((choice) => (
                                <div key={choice.id} className={`choice-card ${currentChoices.length === 0 ? 'fade-out' : ''}`}>
                                    <button className="choice-button" onClick={() => handleChoiceSelect(choice)}>
                                        {choice.text}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Scores section */}
            <div className="score-section">
                <h2>Current Score</h2>
                <div className="score">{score}</div>
            </div>
        </div>
    );
};

export default GameLaunch;
