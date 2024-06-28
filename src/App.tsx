import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import StatisticsPage from './components/StatisticsPage';
import Navbar from './components/Navbar';

const App: React.FC = () => {
    return (
        <Router>
            <div className="w-full min-h-screen bg-slate-50">
                <Navbar />
                <div className="pb-12">
                    <Routes>
                        <Route path="/" element={<SearchPage />} />
                        <Route
                            path="/statistics"
                            element={<StatisticsPage />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
