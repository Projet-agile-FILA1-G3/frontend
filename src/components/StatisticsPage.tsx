import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Chart from './Chart';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ui/datepicker-custom.css';
import './ui/statisticspage.css';
import { registerLocale } from 'react-datepicker';
import { fr } from 'date-fns/locale';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

registerLocale('fr', fr);

const StatisticsPage: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);
    const [interval, setInterval] = useState<string>('hour');
    const [startDate, setStartDate] = useState<Date | null>(
        new Date('2024-01-01T00:00:00')
    );
    const [endDate, setEndDate] = useState<Date | null>(
        new Date('2024-09-09T00:00:00')
    );

    const [query, setQuery] = useState<string>('');

    useEffect(() => {
        if (query) {
            searchAPI(query);
        }
    }, [interval, startDate, endDate]);

    const handleIntervalChange = (value: string) => {
        if (value && value !== interval) {
            setInterval(value);
        }
    };

    const handleStartDateChange = (date: Date | null) => {
        if (date && endDate && date > endDate) {
            setEndDate(date); // Adjust endDate if it's earlier than startDate
        }
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date && startDate && date < startDate) {
            setStartDate(date); // Adjust startDate if it's later than endDate
        }
        setEndDate(date);
    };

    const handleQueryChange = (newQuery: string) => {
        setQuery(newQuery);
    };

    const getParams = (query: string) => {
        return {
            query: query,
            start_date: startDate,
            end_date: endDate,
            interval: interval,
        };
    };

    const processResults = (data: any) => {
        setResults(data);
    };

    const searchAPI = async (query: string) => {
        const params = getParams(query);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_APP_API_BASE_URL}/metrics`,
                {
                    params,
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );

            if (response.status === 204) {
                setResults([]);
            } else {
                processResults(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setResults([]);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <SearchBar
                apiUrl={`${import.meta.env.VITE_APP_API_BASE_URL}/metrics`}
                placeholder="Rechercher des statistiques sur quelque chose..."
                getParams={getParams}
                processResults={processResults}
                renderResults={() => <div />}
                onQueryChange={handleQueryChange}
            />
            <div className="flex justify-between items-center space-x-40 w-4/5">
                <div className="flex flex-row space-x-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="startDate"
                            className="mb-1 font-semibold text-orange-500 text-xs"
                        >
                            Date de début :{' '}
                        </label>
                        <DatePicker
                            className="border border-gray-200 rounded-lg p-1 w-80"
                            selected={startDate}
                            onChange={handleStartDateChange}
                            showTimeSelect
                            timeCaption="Heure"
                            dateFormat="dd/MM/yyyy, HH:mm"
                            locale="fr"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="endDate"
                            className="mb-1 font-semibold text-orange-500 text-xs"
                        >
                            Date de fin :{' '}
                        </label>
                        <DatePicker
                            className="border border-gray-200 rounded-lg p-1 w-80"
                            selected={endDate}
                            onChange={handleEndDateChange}
                            showTimeSelect
                            timeCaption="Heure"
                            dateFormat="dd/MM/yyyy, HH:mm"
                            locale="fr"
                        />
                    </div>
                </div>
                <ToggleGroup
                    type="single"
                    value={interval}
                    onValueChange={(value) => handleIntervalChange(value)}
                    className="flex space-x-2"
                >
                    <ToggleGroupItem
                        value="hour"
                        aria-label="Heure"
                        className={`p-3 border rounded-lg ${interval === 'hour' ? 'custom-selected' : 'custom-not-selected'}`}
                    >
                        1H
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="day"
                        aria-label="Jour"
                        className={`p-3 border rounded-lg ${interval === 'day' ? 'custom-selected' : 'custom-not-selected'}`}
                    >
                        1J
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="week"
                        aria-label="Semaine"
                        className={`p-3 border rounded-lg ${interval === 'week' ? 'custom-selected' : 'custom-not-selected'}`}
                    >
                        7J
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            <Chart data={results} />
        </div>
    );
};

export default StatisticsPage;
