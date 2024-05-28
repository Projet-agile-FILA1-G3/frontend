import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Card from './components/Card';

const App: React.FC = () => {
    const data = [
        'Apple',
        'Banana',
        'Orange',
        'Mango',
        'Pineapple',
        'Strawberry',
        'Blueberry',
        'Raspberry',
    ];

    return (
        <div className="App">
            <h1 className="">RSS Radar
                {import.meta.env.PROD ? '' :
                    <span className="text-red-500"> (Development)</span>
                }
            </h1>
            <SearchBar data={data} />
            <Card />
        </div>
    );
};

export default App;
