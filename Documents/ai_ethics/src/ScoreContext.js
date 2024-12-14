// src/ScoreContext.js
import React, { createContext, useContext, useState } from 'react';

const ScoreContext = createContext();

export const useScore = () => useContext(ScoreContext);

export const ScoreProvider = ({ children }) => {
    const [scores, setScores] = useState({
        openness: 0,
        privacyConcern: 0,
        autonomy: 0,
    });

    const updateScore = (trait, points) => {
        setScores((prevScores) => ({
            ...prevScores,
            [trait]: prevScores[trait] + points,
        }));
    };

    return (
        <ScoreContext.Provider value={{ scores, updateScore }}>
            {children}
        </ScoreContext.Provider>
    );
};
