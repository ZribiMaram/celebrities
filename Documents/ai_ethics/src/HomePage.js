// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';


import Header from './Header';


const HomePage = () => {
    return (
        <div className="homepage">
            <Header /> {/* Header is at the top of every page */}

        </div>
    );
};

export default HomePage;
