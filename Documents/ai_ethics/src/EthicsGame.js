// src/pages/EthicsGame.js
import React, { useState } from 'react';
import ResultsDashboard from './ResultsDashboard'; // Import the ResultsDashboard component
import './EthicsGame.css'; // Import the CSS file
import Header from './Header';
const levels = [
    {
        title: "AI Surveillance System in Public Spaces",
        description: "A city wants to implement AI-powered surveillance cameras in public spaces to improve safety. The system can detect suspicious behaviors, but it also collects data on all individuals' locations and behaviors.",
        image: "https://www.fujitsu.com/downloads/blog/fgb/2021-06-23/RS71243_Artificial-Intelligence-Crowd-Analysis-white-paper-image-1-1.jpg", // Add image path
        options: [
            { text: "Approve without restrictions", ethicsImpact: -2, privacyImpact: -3, safetyImpact: 3 },
            { text: "Approve with privacy constraints", ethicsImpact: 1, privacyImpact: 2, safetyImpact: 2 },
            { text: "Reject the proposal", ethicsImpact: 3, privacyImpact: 3, safetyImpact: -2 },
        ],
        feedback: [
            "Approving without restrictions will increase safety but greatly impact privacy and ethics.",
            "Approving with privacy constraints balances safety and privacy.",
            "Rejecting prioritizes privacy and ethics but may reduce safety."
        ]
    },
    {
        title: "Emotion-Based Advertising for Kids' Apps",
        description: "A company wants to use AI to detect kids' emotions through a tablet camera and adapt ads based on their emotional state. This could increase engagement but might exploit children's vulnerability.",
        image: "https://i.ytimg.com/vi/eMc-IDDp6Tc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDqzGJBEMIqPzYdcT69tFl7r7u1Bw",
        options: [
            { text: "Approve without restrictions", ethicsImpact: -3, privacyImpact: -3, safetyImpact: 1 },
            { text: "Approve with strict parental consent", ethicsImpact: 2, privacyImpact: 2, safetyImpact: 1 },
            { text: "Reject the proposal", ethicsImpact: 3, privacyImpact: 3, safetyImpact: -1 },
        ],
        feedback: [
            "Approving without restrictions maximizes engagement but risks exploitation and raises ethical concerns.",
            "Approving with parental consent balances engagement with ethical considerations.",
            "Rejecting protects children's vulnerability but may limit innovation in engagement strategies."
        ]
    },
    {
        title: "Predictive AI for Hiring Decisions",
        description: "A company wants to use AI to analyze candidates' facial expressions and body language during interviews to predict job suitability. This could help streamline hiring but may lead to biased decisions.",
        image: "https://imageio.forbes.com/specials-images/imageserve/64a832bd07ad711c5eb4ddd6/Personnel-evaluation-by-artificial-intelligence-blue-background-vector-illustration/960x0.jpg?format=jpg&width=960",
        options: [
            { text: "Approve without restrictions", ethicsImpact: -3, privacyImpact: -2, safetyImpact: 1 },
            { text: "Approve with transparency and oversight", ethicsImpact: 2, privacyImpact: 1, safetyImpact: 2 },
            { text: "Reject the proposal", ethicsImpact: 3, privacyImpact: 3, safetyImpact: -2 },
        ],
        feedback: [
            "Approving without restrictions may lead to biased hiring practices and affect privacy.",
            "Approving with oversight and transparency promotes fairness and privacy protection.",
            "Rejecting protects against bias and privacy invasion but may slow down hiring innovation."
        ]
    },
    {
        title: "Healthcare AI for Early Disease Detection",
        description: "A hospital wants to use AI to predict disease risks based on patients' lifestyle and genetic data. This can improve preventive care but involves sensitive personal information.",
        image: "https://lucemhealth.com/wp-content/uploads/2024/04/Prevent-Hospitalizations_Main-min.jpg",
        options: [
            { text: "Approve without restrictions", ethicsImpact: -2, privacyImpact: -3, safetyImpact: 3 },
            { text: "Approve with data privacy safeguards", ethicsImpact: 2, privacyImpact: 2, safetyImpact: 2 },
            { text: "Reject the proposal", ethicsImpact: 3, privacyImpact: 3, safetyImpact: -1 },
        ],
        feedback: [
            "Approving without restrictions improves healthcare but risks patient privacy.",
            "Approving with privacy safeguards balances preventive care and privacy protection.",
            "Rejecting protects privacy but may limit healthcare innovation in early detection."
        ]
    },
    {
        title: "AI Chatbots for Mental Health Support",
        description: "An app developer wants to use AI chatbots to provide emotional support to users experiencing stress. This could provide easy access to help but might lack genuine empathy and raise privacy concerns.",
        image: "https://www.kommunicate.io/blog/wp-content/uploads/2023/04/Top-5-mental-health-chatbots-.png",
        options: [
            { text: "Approve without restrictions", ethicsImpact: -2, privacyImpact: -2, safetyImpact: 2 },
            { text: "Approve with clear disclaimers", ethicsImpact: 1, privacyImpact: 2, safetyImpact: 2 },
            { text: "Reject the proposal", ethicsImpact: 3, privacyImpact: 3, safetyImpact: -1 },
        ],
        feedback: [
            "Approving without restrictions provides quick support but may lack empathy and privacy considerations.",
            "Approving with disclaimers informs users about AI limitations while still providing support.",
            "Rejecting protects users from potential emotional harm but may limit access to mental health resources."
        ]
    },
    {
        title: "AI-Powered Law Enforcement Predictions",
        description: "A city wants to use AI to predict potential crimes based on demographic data to allocate resources. While this may reduce crime, it could lead to profiling and discrimination.",
        image: "https://smartblueline.ai/wp-content/uploads/2024/02/DALL%C2%B7E-2024-02-24-23.59.23-An-illustration-showing-a-UK-police-officer-analyzing-a-digital-map-on-a-tablet-which-displays-predictive-data-about-crime-hotspots-in-the-community.webp",
        options: [
            { text: "Approve without restrictions", ethicsImpact: -3, privacyImpact: -3, safetyImpact: 3 },
            { text: "Approve with strict data controls", ethicsImpact: 2, privacyImpact: 2, safetyImpact: 2 },
            { text: "Reject the proposal", ethicsImpact: 3, privacyImpact: 3, safetyImpact: -2 },
        ],
        feedback: [
            "Approving without restrictions may increase safety but risks discrimination and profiling.",
            "Approving with strict data controls balances public safety with ethical considerations.",
            "Rejecting protects against profiling but may reduce proactive safety measures."
        ]
    },
    {
        title: "Emotion-Detection AI for Workplace Monitoring",
        description: "A company wants to use AI to monitor employees' emotions to improve productivity. This could help identify stressed employees but might invade privacy and affect morale.",
        image: "https://dce0qyjkutl4h.cloudfront.net/wp-content/webp-express/webp-images/uploads/2023/07/emotion-recognition-using-Azure-Cognitive.png.webp",
        options: [
            { text: "Approve without restrictions", ethicsImpact: -2, privacyImpact: -3, safetyImpact: 1 },
            { text: "Approve with employee consent", ethicsImpact: 2, privacyImpact: 2, safetyImpact: 1 },
            { text: "Reject the proposal", ethicsImpact: 3, privacyImpact: 3, safetyImpact: -1 },
        ],
        feedback: [
            "Approving without restrictions may boost productivity but risks invading employee privacy.",
            "Approving with consent balances productivity with employee autonomy and privacy.",
            "Rejecting prioritizes employee privacy but may limit workplace optimization."
        ]
    }

];

const EthicsGame = () => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [scores, setScores] = useState({ ethics: 0, privacy: 0, safety: 0 });
    const [showResults, setShowResults] = useState(false);

    const handleOptionSelect = (option, index) => {
        setScores((prevScores) => ({
            ethics: prevScores.ethics + option.ethicsImpact,
            privacy: prevScores.privacy + option.privacyImpact,
            safety: prevScores.safety + option.safetyImpact,
        }));
        setSelectedFeedback(levels[currentLevel].feedback[index]);
    };

    const handleNextLevel = () => {
        setSelectedFeedback(null);
        if (currentLevel < levels.length - 1) {
            setCurrentLevel((prevLevel) => prevLevel + 1);
        } else {
            setShowResults(true);
        }
    };

    return (
        <div className="ethics-game-container">
            <Header />

            {showResults ? (
                <ResultsDashboard ethics={scores.ethics} privacy={scores.privacy} safety={scores.safety} />
            ) : (
                <div className="level-container">
                    <img src={levels[currentLevel].image} alt={levels[currentLevel].title} className="level-image" />
                    <h2>{levels[currentLevel].title}</h2>
                    <p>{levels[currentLevel].description}</p>
                    <div className="options-container">
                        {levels[currentLevel].options.map((option, index) => (
                            <button
                                key={index}
                                className="option-button"
                                onClick={() => handleOptionSelect(option, index)}
                                disabled={selectedFeedback !== null}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                    {selectedFeedback && (
                        <div className="feedback-container">
                            <p>{selectedFeedback}</p>
                            <button className="next-button" onClick={handleNextLevel}>Next</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EthicsGame;