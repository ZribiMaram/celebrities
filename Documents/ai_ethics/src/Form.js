import React from 'react';
import Header from './Header'; // Adjust the import path based on your project structure

export default function Form() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#7098c0',
                padding: '20px',
            }}
        >
            <div
                style={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    maxWidth: '500px',
                    width: '100%',
                    padding: '20px',
                    textAlign: 'center',
                }}
            >
                <Header /> {/* This will render the Header component */}
                <h2 style={{ marginBottom: '15px', color: '#333' }}>
                    Share Your Experience
                </h2>
                <p style={{ marginBottom: '20px', color: '#555' }}>
                    We value your feedback! Please click the button below to fill out our
                    Google Form and share your thoughts with us.
                </p>
                <a
                    href="https://docs.google.com/forms/u/1/d/e/1FAIpQLSe_reJxFHFFb7BAzNx8X2oNB9BvRyvisFmc50GSVUBStLtUeQ/viewform?usp=header&usp=embed_facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-block',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '16px',
                    }}
                >
                    Fill Out the Form
                </a>
            </div>
        </div>
    );
}
