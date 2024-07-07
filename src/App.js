import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VocabularyLists from './components/VocabularyLists';
import LearnPage from './components/LearnPage';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<VocabularyLists />} />
                    <Route path="/learn/:id" element={<LearnPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
