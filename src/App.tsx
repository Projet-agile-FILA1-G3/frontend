import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';

const PageOne: React.FC = () => <div>Page One Content</div>;

const App: React.FC = () => {
    return (
        <Router>
            <div className="w-full h-screen overflow-scroll bg-slate-50">
                <Navbar />
                <Routes>
                    <Route path="/" element={<SearchBar />} />
                    <Route path="/page-one" element={<PageOne />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
