import React, { useState, useEffect } from 'react';

const StorylineCard = ({ character }) => {
    const [storyline, setStoryline] = useState(null);

    useEffect(() => {
        const fetchStoryline = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/storylines/${character}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStoryline(data);
            } catch (error) {
                console.error("Error fetching storyline:", error);
            }
        };

        fetchStoryline();
    }, [character]);

    const handleChoice = (choiceKey) => {
        // Implement the logic to handle the player's choice
        console.log("Choice selected:", choiceKey);
        // For now, just log the choice
    };

    if (!storyline) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '2rem', backgroundColor: '#1e1e2e', color: '#ffffff', minHeight: '100vh' }}>
            <h1>{storyline.introduction}</h1>
            {storyline.conflict && Object.entries(storyline.conflict).map(([key, conflict]) => (
                <div key={key} style={{ marginBottom: '1rem' }}>
                    <p>{conflict.text}</p>
                    {conflict.choices && Object.entries(conflict.choices).map(([choiceKey, choice]) => (
                        <button
                            key={choiceKey}
                            onClick={() => handleChoice(choiceKey)}
                            style={{ margin: '0.5rem', padding: '1rem', backgroundColor: '#f39c12', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}
                        >
                            {choice.outcome}
                        </button>
                    ))}
                </div>
            ))}
            {storyline.resolution && (
                <div>
                    {Object.entries(storyline.resolution).map(([key, resolution]) => (
                        <p key={key}>{resolution}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StorylineCard;
