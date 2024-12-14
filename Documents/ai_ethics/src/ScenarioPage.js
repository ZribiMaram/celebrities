// src/pages/ScenarioPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScore } from './ScoreContext';
import './QuizAndScenario.css'; // Use the same CSS file as QuizPage
import Header from './Header';
const scenarios = [
    {
        question: "Your AI fitness app starts offering motivational quotes based on your emotional state. Would you continue using it?",
        image:"https://www.verywellmind.com/thmb/uJTUFTBVli7FCkAUFXTztwvUD6o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/BestMentalHealthApps_edit-7b401a8bcf5d49e18e68329d4a572779.jpg",
        options: [
            { text: "Yes, it keeps me motivated", trait: "openness", points: 2, feedback: "It can be helpful, but it also raises questions about reliance on AI for emotional support." },
            { text: "No, I prefer not to rely on AI for motivation", trait: "autonomy", points: 2, feedback: "Relying less on AI for emotional support can promote personal independence." },
            { text: "I'm not sure", trait: "privacyConcern", points: 1, feedback: "AI can be useful for motivation, but its influence on emotions should be carefully considered." }
        ]
    },
    {
        question: "An AI-driven social media app filters your feed based on your mood to reduce negative content. Is this helpful?",
        image:"https://www.nimbleappgenie.com/blogs/wp-content/uploads/2024/03/Top-Use-Cases-for-AI-in-Social-Media.webp",
        options: [
            { text: "Yes, it protects my mental health", trait: "openness", points: 2, feedback: "Filtering negative content can be beneficial, but it could create echo chambers and limit exposure to reality." },
            { text: "No, I want to see all content", trait: "privacyConcern", points: 2, feedback: "Seeing all content promotes transparency, though it may sometimes affect mental health." },
            { text: "I'm not sure", trait: "autonomy", points: 1, feedback: "Balancing mental health and a realistic view of the world is an important consideration." }
        ]
    },
    {
        question: "A virtual therapist uses AI to detect your emotional state and adjust its responses. Would you feel comfortable?",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0J2bG-GF5mkVw7P0onQUiPBb5GeK6gIG1fw&s",
        options: [
            { text: "Yes, it’s helpful for therapy", trait: "openness", points: 2, feedback: "This could make therapy more effective, but it may also lack genuine human empathy." },
            { text: "No, it feels artificial", trait: "privacyConcern", points: 2, feedback: "Human therapists provide genuine empathy that AI might struggle to replicate authentically." },
            { text: "I'm not sure", trait: "autonomy", points: 1, feedback: "While it could improve therapy, it raises questions about the role of AI in mental health." }
        ]
    },
    {
        question: "An AI app detects stress in your voice and recommends relaxation techniques. Would you use it?",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsBqH91HV2usijAvRNe8KVNnWJoxseq9OwooI16M80pyFEiGM4rLqkbU74NoULrOmsA2U&usqp=CAU",
        options: [
            { text: "Yes, it’s useful for stress management", trait: "openness", points: 2, feedback: "AI for stress management can be beneficial, but users should be aware of data privacy issues." },
            { text: "No, I’d rather not rely on AI for this", trait: "autonomy", points: 2, feedback: "Avoiding reliance on AI for stress management may help maintain personal control over mental health." },
            { text: "I'm not sure", trait: "privacyConcern", points: 1, feedback: "AI can help manage stress, but there are important considerations around privacy and personal agency." }
        ]
    },
    {
        question: "A dating app uses AI to detect your emotions during profile browsing to suggest matches. Is this acceptable?",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbnsO7gG_qR6ZGPCGoxvqMqb9jHzlQ5MUM_Q&s",
        options: [
            { text: "Yes, it could improve matches", trait: "openness", points: 2, feedback: "Emotion-based matching might improve compatibility but could feel intrusive." },
            { text: "No, it’s too invasive", trait: "privacyConcern", points: 2, feedback: "Emotion tracking in dating could breach privacy and autonomy in personal relationships." },
            { text: "I'm not sure", trait: "autonomy", points: 1, feedback: "It may enhance matching, but the ethical implications of emotional tracking are complex." }
        ]
    },
    {
        question: "An AI news app adjusts its tone based on your emotions to make news less upsetting. Is this appropriate?",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScUbaOkoJ8tgsh4mRbpjXRHvWWdjVATlqlVA&s",
        options: [
            { text: "Yes, it’s beneficial", trait: "openness", points: 2, feedback: "Reducing distress can be helpful, but it may also prevent users from fully engaging with reality." },
            { text: "No, news should be objective", trait: "privacyConcern", points: 2, feedback: "Objectivity in news is important; emotional adjustments could lead to biased or filtered information." },
            { text: "I'm not sure", trait: "autonomy", points: 1, feedback: "Balancing user well-being and accurate information is a challenging ethical issue." }
        ]
    },
    {
        question: "A virtual personal assistant detects when you’re feeling down and suggests mood-boosting activities. Would you welcome this?",
        image:"https://images.prismic.io/turing/652ec640fbd9a45bcec819fd_AI_Powered_Virtual_Assistant_c6d268785b.webp?auto=format,compress",
        options: [
            { text: "Yes, it’s a nice feature", trait: "openness", points: 2, feedback: "AI suggestions can be helpful, but dependency on AI for emotional support could be a concern." },
            { text: "No, I’d rather not rely on AI for that", trait: "autonomy", points: 2, feedback: "Choosing not to rely on AI for emotional support helps maintain personal resilience." },
            { text: "I'm not sure", trait: "privacyConcern", points: 1, feedback: "It could be useful, but it’s worth considering the potential for AI to overreach in personal matters." }
        ]
    },
    {
        question: "An AI assistant in your car detects frustration and tries to calm you down. Do you think this is helpful?",
        image:"https://voicebot.ai/wp-content/uploads/2019/12/cars.png",
        options: [
            { text: "Yes, it’s useful for road safety", trait: "openness", points: 2, feedback: "Calming frustrated drivers can improve safety, but some may feel uncomfortable with AI sensing emotions." },
            { text: "No, I don’t want AI analyzing my emotions while driving", trait: "privacyConcern", points: 2, feedback: "Privacy in personal spaces like a car is a legitimate concern for emotional tracking." },
            { text: "I'm not sure", trait: "autonomy", points: 1, feedback: "Balancing privacy and safety is an important consideration when using AI in personal spaces." }
        ]
    }
    
];
const ScenarioPage = () => {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const { updateScore } = useScore();
    const navigate = useNavigate();

    const handleOptionClick = (option) => {
        updateScore(option.trait, option.points);
        setSelectedFeedback(option.feedback);
    };

    const handleNextScenario = () => {
        setSelectedFeedback(null);
        if (currentScenario < scenarios.length - 1) {
            setCurrentScenario((prev) => prev + 1);
        } else {
            navigate('/results');
        }
    };

    return (
        
       
        <div className="quiz-container">
            
            <Header />
            <div className="question-container">
                {/* Display the image for the current scenario */}
                <img 
                    src={scenarios[currentScenario].image} 
                    alt="Scenario Image" 
                    className="question-image" 
                />
                <h2>{scenarios[currentScenario].question}</h2>
                <div className="options-container">
                    {scenarios[currentScenario].options.map((option, index) => (
                        <button 
                            key={index} 
                            className="option-button"
                            onClick={() => handleOptionClick(option)}
                            disabled={selectedFeedback !== null} // Disable after selection
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
                {selectedFeedback && (
                    <div className="feedback-container">
                        <p>{selectedFeedback}</p>
                        <button className="next-button" onClick={handleNextScenario}>Next Scenario</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScenarioPage;