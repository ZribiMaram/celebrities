// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className='header-title'>Home</Link>
            <nav className="nav-links">
                <Link to="/quiz">Quiz</Link>
                <Link to="/scenarios">Scenarios</Link>
                <Link to="/game">Ethics Game</Link>
                <Link to="/form">Reflection Form</Link>
            </nav>
        </header>
    );
};

export default Header;
