import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from './ui/pagination';

const SearchPage: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1); // Default current page
    const [query, setQuery] = useState<string>('');

    const getParams = (query: string, page: number, perPage: number) => {
        return { query: query, page: page, per_page: perPage };
    };

    const processResults = (data: any) => {
        setResults(data.results);
        setTotalPages(data.total_pages);
    };

    const handleQueryChange = (newQuery: string) => {
        setQuery(newQuery);
        setCurrentPage(1);
        setTotalPages(0);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        searchAPI(query, page, 10);
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

    const searchAPI = async (query: string, page: number, perPage: number) => {
        const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/search?query=${query}&page=${page}&per_page=${perPage}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        processResults(data);
    };

    const getPageButtons = () => {
        const buttons: JSX.Element[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href="#"
                            isActive={currentPage === i}
                            onClick={() => handlePageChange(i)}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            buttons.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        href="#"
                        isActive={currentPage === 1}
                        onClick={() => handlePageChange(1)}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            if (currentPage > 3) {
                buttons.push(<PaginationItem key="ellipsis1"><PaginationEllipsis /></PaginationItem>);
            }

            if (currentPage === 1) {
                for (let i = 2; i <= Math.min(4, totalPages); i++) {
                    buttons.push(
                        <PaginationItem key={i}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === i}
                                onClick={() => handlePageChange(i)}
                            >
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
            } else if (currentPage === totalPages) {
                for (let i = Math.max(1, totalPages - 3); i <= totalPages - 1; i++) {
                    buttons.push(
                        <PaginationItem key={i}>
                            <PaginationLink
                                href="#"
                                isActive={currentPage === i}
                                onClick={() => handlePageChange(i)}
                            >
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
            } else {
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    if (i !== 1 && i !== totalPages) {
                        buttons.push(
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === i}
                                    onClick={() => handlePageChange(i)}
                                >
                                    {i}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    }
                }
            }

            if (currentPage < totalPages -2) {
                buttons.push(<PaginationItem key="ellipsis2"><PaginationEllipsis /></PaginationItem>);
            }

            buttons.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        href="#"
                        isActive={currentPage === totalPages}
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return buttons;
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
            { totalPages !== 0 && (
                <div className="mt-10">
                    <Pagination>
                        <PaginationContent>
                            {currentPage > 1 && (
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    />
                                </PaginationItem>
                            )}
                            {getPageButtons()}
                            {currentPage < totalPages && (
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
