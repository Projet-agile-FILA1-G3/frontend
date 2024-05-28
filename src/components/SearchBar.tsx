import React, { useState, ChangeEvent } from 'react';

// Définition des types pour les props
interface SearchBarProps {
    data: string[];
}

// Composant SearchBar
const SearchBar: React.FC<SearchBarProps> = ({ data }) => {
    // Définir l'état pour la requête de recherche et les données filtrées
    const [query, setQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<string[]>([]);

    // Gérer les changements de l'entrée utilisateur
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        filterData(value);
    };

    // Filtrer les données en fonction de la requête de recherche
    const filterData = (query: string) => {
        if (query.length > 0) {
            const results = data.filter((item) =>
                item.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredData(results);
        } else {
            setFilteredData([]);
        }
    };

    return (
        <div className="max-w-md mx-auto w-full">
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
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
                    id="search"
                    placeholder="Search something.."
                />
            </div>
            {filteredData.length > 0 && (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {filteredData.map((item, index) => (
                        <li key={index} style={{ padding: '5px 0' }}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
