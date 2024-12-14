// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import QuizPage from './QuizPage';
import ScenarioPage from './ScenarioPage';
import EthicsGame from './EthicsGame';
import Form from './Form'; // Import your custom form component here
import { ScoreProvider } from './ScoreContext'; // Import the ScoreProvider
import ResultsPage from './ResultsPage';
import './App.css';

function App() {
  return (
    <ScoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/scenarios" element={<ScenarioPage />} />
          <Route path="/game" element={<EthicsGame />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/form" element={<Form />} />
        </Routes>

      </Router>
    </ScoreProvider>
  );
}

export default App;
