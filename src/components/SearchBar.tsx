import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import Card from './Card';
import Loader from './ui/Loader';

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
    const [query, setQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [results, setResults] = useState<any[]>([]);
    const [noResults, setNoResults] = useState<boolean>(false);
    const [badRequest, setBadRequest] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
        setNoResults(false);
        setBadRequest(false);
        setError(false);
    };

    const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            await searchAPI(query);
        }
    };

    const searchAPI = async (query: string) => {
        if (query.trim() === '') {
            setBadRequest(true);
            setResults([]);
            return;
        }

        setIsLoading(true); // Début du chargement

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_API_BASE_URL}/search`,
                {
                    params: {
                        query: query,
                        limit: 10,
                    },
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );

            if (response.status === 204) {
                setNoResults(true);
                setResults([]);
            } else {
                setResults(response.data);
                setNoResults(false);
                setBadRequest(false);
                setError(false);
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400) {
                    setBadRequest(true);
                } else {
                    setError(true);
                }
            } else {
                setError(true);
            }
            setResults([]);
        } finally {
            setIsLoading(false); // Fin du chargement
        }
    };

    return (
        <div className="mx-auto w-full flex flex-col items-center">
            <div className="relative flex items-center max-w-2xl m-8 w-full h-12 rounded-lg shadow-lg focus-within:ring-2 focus-within:ring-orange-500 bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    id="search"
                    placeholder="Search something.."
                />
            </div>
            {isLoading && <Loader />}
            {noResults && <p className="text-red-500">No results found.</p>}
            {badRequest && (
                <p className="text-red-500">
                    Bad request. Please enter a valid search term.
                </p>
            )}
            {error && (
                <p className="text-red-500">
                    An error occurred while fetching data.
                </p>
            )}
            {!noResults && !badRequest && !error && results.length > 0 && (
                <div className="grid gap-4">
                    {results.map((item, index) => (
                        <Card
                            key={index}
                            title={item.title}
                            description={item.description}
                            link={item.link}
                            pub_date={item.pub_date}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
