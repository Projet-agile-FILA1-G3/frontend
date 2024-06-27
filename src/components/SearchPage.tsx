import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';

const SearchPage: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);
    const [query, setQuery] = useState<string>('');

    const getParams = (query: string) => {
        return { query: query, limit: 10 };
    };

    const processResults = (data: any) => {
        setResults(data);
    };

    const handleQueryChange = (newQuery: string) => {
        setQuery(newQuery);
    };

    const renderResults = () => {
        return (
            <div className="grid gap-4">
                {results.map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        description={item.description}
                        link={item.link}
                        pub_date={item.pub_date}
                        audio_link={item.audio_link}
                    />
                ))}
            </div>
        );
    };

    return (
        <div>
            <SearchBar
                apiUrl={`${import.meta.env.VITE_APP_API_BASE_URL}/search`}
                getParams={getParams}
                placeholder="Rechercher quelque chose..."
                processResults={processResults}
                renderResults={renderResults}
                onQueryChange={handleQueryChange}
            />
        </div>
    );
};

export default SearchPage;
