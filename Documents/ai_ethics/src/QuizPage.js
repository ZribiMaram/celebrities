// src/pages/QuizPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScore } from './ScoreContext';
import './QuizAndScenario.css'; // Use the same CSS file as QuizPage
import Header from './Header';
const questions = [
    {
        question: "Would you be okay with an AI monitoring your emotional state to suggest mental health interventions?",
        image:"https://files.oaiusercontent.com/file-pTLlITWJ6qcHbbZqPdk0txne?se=2024-11-08T21%3A15%3A11Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D81119b3c-64ba-4636-a8f6-624dde72951c.webp&sig=yeHgJXFcGKpbe3mAr5UNOeJw67jZfoeuYKyDi%2BKGo/A%3D",
        options: [
            { text: "Yes, if it helps me", trait: "openness", points: 2 },
            { text: "No, that's invasive", trait: "privacyConcern", points: 2 },
            { text: "Maybe, with privacy controls", trait: "autonomy", points: 1 },
            { text: "I'm not sure", trait: "privacyConcern", points: 1 }
        ],
        feedback: "This question touches on the balance between helpful interventions and personal privacy in sensitive areas like mental health."
    },
    {
        question: "Do you think AI should be used to influence political opinions through targeted messaging?",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFy6hEs14cjeYojZshiyrnQ0t5Zq-SCvfA_99ICifRpEvbO39ag9JXo5bRfwc4U5wqvLw&usqp=CAU",
        options: [
            { text: "Yes", trait: "openness", points: 2 },
            { text: "No", trait: "privacyConcern", points: 2 },
            { text: "Only in certain cases", trait: "autonomy", points: 1 },
            { text: "I'm not sure", trait: "autonomy", points: 1 }
        ],
        feedback: "Using AI for political influence raises questions about manipulation, free will, and the integrity of democratic processes."
    },
    {
        question: "Would you trust an AI to provide you with emotional support during stressful times?",
        image:"https://cff2.earth.com/uploads/2024/04/14091710/ai_robot_humans_emotional-support_1m.jpg",
        options: [
            { text: "Yes, it's helpful", trait: "openness", points: 2 },
            { text: "No, I prefer humans", trait: "privacyConcern", points: 2 },
            { text: "It depends on the situation", trait: "autonomy", points: 1 },
            { text: "I'm not sure", trait: "autonomy", points: 1 }
        ],
        feedback: "While AI can offer convenience, emotional support may lack authenticity if it comes from a machine rather than a person."
    },
    {
        question: "Should companies disclose when an AI is making decisions based on your emotional data?",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs6mlBBE_3RV45IOiG7xWCKrfmWq0EWfHOzcPTeBC_iNhEsfx1EfjmRTvh_ef5M72M3rs&usqp=CAU",
        options: [
            { text: "Yes, definitely", trait: "privacyConcern", points: 2 },
            { text: "No, it's unnecessary", trait: "openness", points: 2 },
            { text: "Only if it affects me directly", trait: "autonomy", points: 1 },
            { text: "I'm not sure", trait: "autonomy", points: 1 }
        ],
        feedback: "Transparency in AI-driven decisions is crucial, especially when it involves personal emotions and privacy."
    },
    {
        question: "Do you believe AI should detect and react to emotions in customer service settings?",
        image:"https://images.hiverhq.com/blog/wp-content/uploads/2024/01/tr:pr-true/AI-in-customer-service.png",
        options: [
            { text: "Yes, it improves service", trait: "openness", points: 2 },
            { text: "No, it's manipulative", trait: "privacyConcern", points: 2 },
            { text: "Only with user consent", trait: "autonomy", points: 1 },
            { text: "I'm not sure", trait: "autonomy", points: 1 }
        ],
        feedback: "AI in customer service can enhance user experience, but it may also lead to manipulation if users aren’t aware of it."
    },
    {
        question: "Should AI be allowed to influence children's emotions through educational or entertainment apps?",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFi1FomO-EQ3Ez6rfXAYCATVzbDNxysb0Jhdq7PKhGALAVvdnvCIQzC91FRD6TDWuraJ8&usqp=CAU",
        options: [
            { text: "Yes, if it's educational", trait: "openness", points: 2 },
            { text: "No, it's too risky", trait: "privacyConcern", points: 2 },
            { text: "Only with parental consent", trait: "autonomy", points: 1 },
            { text: "I'm not sure", trait: "privacyConcern", points: 1 }
        ],
        feedback: "AI targeting children’s emotions has ethical implications, as children are more vulnerable to manipulation."
    },
    {
        question: "Would you allow an AI to analyze your emotions to predict your buying preferences?",
        image:"https://etedge-insights.com/wp-content/uploads/2024/07/17th-july-ai.jpg",
        options: [
            { text: "Yes, it’s convenient", trait: "openness", points: 2 },
            { text: "No, it's invasive", trait: "privacyConcern", points: 2 },
            { text: "Only with my permission", trait: "autonomy", points: 1 },
            { text: "I'm not sure", trait: "privacyConcern", points: 1 }
        ],
        feedback: "This highlights privacy concerns and the potential for manipulation in consumer behavior through emotional analysis."
    },
    {
        question: "Do you think AI should simulate empathy when interacting with users?",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREJGcIUvOtD7FFcocUkqobdgH-2i6y8Xrs1A&s",
        options: [
            { text: "Yes, it's beneficial", trait: "openness", points: 2 },
            { text: "No, it's deceptive", trait: "privacyConcern", points: 2 },
            { text: "Only in certain situations", trait: "autonomy", points: 1 },
            { text: "I'm not sure", trait: "autonomy", points: 1 }
        ],
        feedback: "Simulated empathy can improve user experience but may create false impressions of human-like understanding."
    },
    {
        question: "Would you be comfortable with AI detecting your emotions to customize your music or movie suggestions?",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDOngdNtRsrNyG-wc7Sb1Vl-SNiGmIObQKTQ&s",
        options: [
            { text: "Yes, it’s helpful", trait: "openness", points: 2 },
            { text: "No, it feels intrusive", trait: "privacyConcern", points: 2 },
            { text: "It depends on the data used", trait: "autonomy", points: 1 },
            { text: "I'm not sure", trait: "privacyConcern", points: 1 }
        ],
        feedback: "This raises the issue of how much emotional data should be accessible to entertainment platforms."
    },
    {
        question: "Should AI be allowed to influence hiring decisions based on emotional data from candidates?",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxbxnYGEYuxEF4uVOQRvoP5hIskwClomm-ZZ4cmJfxqHxYTlroFjrf6Bs-I76GVlBQfx8&usqp=CAU",
        options: [
            { text: "Yes, it’s useful", trait: "openness", points: 2 },
            { text: "No, it's biased", trait: "privacyConcern", points: 2 },
            { text: "Only with consent", trait: "autonomy", points: 1 },
            { text: "I'm not sure", trait: "privacyConcern", points: 1 }
        ],
        feedback: "Using emotional data in hiring decisions may lead to biases and ethical concerns about fairness and privacy."
    },
    
    
];


const QuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const { updateScore } = useScore();
    const navigate = useNavigate();

    const handleAnswerSelect = (option) => {
        updateScore(option.trait, option.points);
        setShowFeedback(true);
    };

    const handleNextQuestion = () => {
        setShowFeedback(false);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            navigate('/results');
        }
    };

    return (
        <div className="quiz-container">
              <Header />
            
            <div className="question-container">
                {/* Display the image */}
                <img 
                    src={questions[currentQuestion].image} 
                     
                    className="level-image" 
                />
                <h2>{questions[currentQuestion].question}</h2>
               <div className="option-container">
                    {questions[currentQuestion].options.map((option, index) => (
                        <button 
                            key={index} 
                            className="option-button" 
                            onClick={() => handleAnswerSelect(option)}
                            disabled={showFeedback}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
                {showFeedback && (
                    <div className="feedback-container">
                        <p>{questions[currentQuestion].feedback}</p>
                        <button className="next-button" onClick={handleNextQuestion}>Next</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizPage;